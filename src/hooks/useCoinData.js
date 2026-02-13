import { useState, useEffect, useCallback, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { CoinGeckoService } from "../services/api";

const useCoinData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [type] = useContext(DataContext);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10); // CoinGecko free API has limits, keeping it simple

    const fetchCoins = useCallback(async (pageNum = 1) => {
        setLoading(true);
        setError(null);
        try {
            const url = CoinGeckoService.getCoinsMarket(type, pageNum);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setProducts(data);
            setPage(pageNum);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching coins:", err);
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
