/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled"
import Carousel from "../../components/Carousel"
import carouselBg from "../../assets/images/bgImage.jpg"
import Table from "../../components/Table"
import Loader from "../../components/Loader"
import { useContext, useState, useEffect } from "react"
import { DataContext } from "../../context/DataContext"

const CarouselBackground = styled.div`
  background-image: url(${carouselBg});
  background-size: cover;
  background-position: center;
  height: 400px;
`;
const Title = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #87ceeb;
  margin-bottom: 10px;
  padding-top: 69px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 21.98px;
  letter-spacing: 0.10px;
  text-align: center;
  color: #a9a9a9;
  margin-bottom: 40px;
`;

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type, setType, watch, setWatch] = useContext(DataContext);

    async function getData(page = 1) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${type}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        getData();
      }, [type]);

   return (
    <>
      {
        loading ? (
            <Loader/>
        ) : (
            <>
            <CarouselBackground>
                <Title>CRYPTOFOLIO WATCH LIST</Title>
                <Subtitle>Get all the Info regarding your favorite Crypto Currency</Subtitle>
                <Carousel data={products} />
            </CarouselBackground>
            <Table data={products} fetchData={getData}/>
            </>
        )
      }
    </>
  )
}

export default Home