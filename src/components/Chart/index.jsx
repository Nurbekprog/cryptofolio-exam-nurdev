/* eslint-disable react/prop-types */
import { useState, useEffect, useContext} from "react";
import { useCallback } from "react";
import {Line} from "react-chartjs-2";
import "chart.js/auto"
import { DataContext } from "../../context/DataContext";
import Loader from "../Loader";
import styled from "@emotion/styled";
import { CoinGeckoService } from "../../services/api";

const Container = styled.div`
  width: 100%;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 24px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;

  @media (max-width: 420px) {
    min-height: 310px;
    padding: 16px 8px;
  }
`;

function Chart({id, days}) {
    const [type] = useContext(DataContext);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            // days usually is "1", "30", "90", "365" based on About page.
            const url = CoinGeckoService.getHistoricalChart(id, days, type);
            const response = await fetch(url);
            const data = await response.json();
            setProduct(data.prices);
        }catch(err) {
            console.error(err);
        }finally {
            setLoading(false);
        }
    }, [days, id, type]);

    useEffect(() => {
        getData();
    }, [getData]);

   
    return (
        <Container>
            {
                !product || loading ? (
                    <Loader />
                ) : (
                    <div style={{ width: '100%', height: '100%' }}>
                    <Line 
                       data={{
                        labels: product.map((item) => {
                            let date = new Date(item[0]);
                            let time = date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === "1" ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: product.map((item) => item[1]),
                                label: `Price (Past ${days} Days) in ${type}`,
                                borderColor: "#FCD535", 
                                borderWidth: 2,
                                pointRadius: 0, 
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "#FCD535",
                                tension: 0.1,
                                fill: true,
                                backgroundColor: (context) => {
                                  const ctx = context.chart.ctx;
                                  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                  gradient.addColorStop(0, "rgba(252, 213, 53, 0.2)");
                                  gradient.addColorStop(1, "rgba(252, 213, 53, 0)");
                                  return gradient;
                                },
                            }
                        ]
                       }}
                       options={{
                       responsive: true,
                       maintainAspectRatio: false,
                       plugins: {
                         legend: {
                           display: false
                         },
                         tooltip: {
                           mode: 'index',
                           intersect: false,
                           backgroundColor: 'rgba(21, 26, 33, 0.9)',
                           titleColor: '#F3F4F6',
                           bodyColor: '#FCD535',
                           borderColor: 'rgba(255,255,255,0.1)',
                           borderWidth: 1
                         }
                       },
                       scales: {
                         x: {
                           grid: { display: false },
                           ticks: { color: '#6B7280', maxTicksLimit: 8 }
                         },
                         y: {
                           grid: { color: 'rgba(255,255,255,0.05)' },
                           ticks: { color: '#6B7280' }
                         }
                       }
                       }}
                       />
                    </div>
                )
            }
        </Container>
  )
}

export default Chart
