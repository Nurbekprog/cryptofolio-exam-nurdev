import { useState, useEffect, useCallback, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { CoinGeckoService } from "../services/api";

const CACHE_duration = 2 * 60 * 1000; // 2 minutes

const useCoinData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type] = useContext(DataContext);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const getCacheKey = (currency, pageNum) => `coins_${currency}_${pageNum}`;

    const fetchCoins = useCallback(async (pageNum = 1) => {
        const cacheKey = getCacheKey(type, pageNum);
        const cached = localStorage.getItem(cacheKey);
        const now = Date.now();

        // 1. Try to serve from cache if valid
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (now - timestamp < CACHE_duration) {
                setProducts(data);
                setPage(pageNum);
                return;
            }
        }

        setLoading(true);
        setError(null);
        
        try {
            const url = CoinGeckoService.getCoinsMarket(type, pageNum);
            const response = await fetch(url);
            
            if (!response.ok) {
                // Handle 429 (Too Many Requests) specifically
                if (response.status === 429 && cached) {
                    console.warn("API Rate Limit hit, serving stale cache");
                    const { data } = JSON.parse(cached);
                    setProducts(data);
                    setPage(pageNum);
                    return;
                }
                throw new Error(`Failed to fetch data: ${response.status}`);
            }

            const data = await response.json();
            
            // Save to cache
            localStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: now
            }));

            setProducts(data);
            setPage(pageNum);
        } catch (err) {
            // Fallback to stale cache on other errors if available
            if (cached) {
                console.warn("Fetch failed, serving stale cache", err);
                const { data } = JSON.parse(cached);
                setProducts(data);
                setPage(pageNum);
            } else {
                setError(err.message);
                console.error("Error fetching coins:", err);
            }
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchCoins(page);
    }, [fetchCoins, page]);

    return { products, loading, error, fetchCoins, page, setPage, totalPages };
};

export default useCoinData;
