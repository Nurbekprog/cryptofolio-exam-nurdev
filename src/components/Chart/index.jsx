/* eslint-disable react/prop-types */
import { useState, useEffect, useContext} from "react";
import { useCallback } from "react";
import {Line} from "react-chartjs-2";
import "chart.js/auto"
import { createTheme, ThemeProvider } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import Loader from "../Loader";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 24px 12px;
  background: rgba(22, 23, 26, 0.65);
  border: 1px solid rgba(135, 206, 235, 0.2);
  border-radius: 12px;
`;
function Chart({id, days}) {
    const [type] = useContext(DataContext);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#ffffff",
            },
            mode: "dark",
        },
    });

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${type}&days=${days}`)
                const data = await response.json();
                setProduct(data.prices);
        }catch(err) {
            console.log(err);
        }finally {
            setLoading(false);
        }
    }, [days, id, type]);

    useEffect(() => {
        getData();
    }, [getData]);

   
  return (
    <ThemeProvider theme={darkTheme}>
        <Container>
            {
                !product || loading ? (
                    <Loader />
                ) : (
                    <Line 
                       data={{
                        labels: product.map((item) => {
                            let date = new Date(item[0]);
                            let time = date.getHours() > 12
                            ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                            : `${date.getHours()} : ${date.getMinutes()}AM`;
                            return days === "24" ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: product.map((item) => item[1]),
                                label: `Price ( Past ${days} Days ) in ${type}`,
                                borderColor: "skyblue",
                            }
                        ]
                       }}
                       options={{
                       responsive: true,
                       maintainAspectRatio: false,
                       elements: {
                       point: {
                       radius: 1,
                       }
                       }}}
                       height={320}
                       />
                )
            }
        </Container>
    </ThemeProvider>
  )
}

export default Chart
