import styled from "@emotion/styled"
import Carousel from "../../components/Carousel"
import carouselBg from "../../assets/images/bgImage.jpg"
import Table from "../../components/Table"
import Loader from "../../components/Loader"
import { useContext, useState, useEffect, useCallback } from "react"
import { DataContext } from "../../context/DataContext"

const CarouselBackground = styled.div`
  position: relative;
  background-image: url(${carouselBg});
  background-size: cover;
  background-position: center;
  min-height: 430px;
  padding: 70px 0 45px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(15, 16, 20, 0.5) 0%,
      rgba(15, 16, 20, 0.88) 100%
    );
  }

  @media (max-width: 640px) {
    min-height: 360px;
    padding: 44px 0 24px;
  }
`;
const Title = styled.h2`
  position: relative;
  z-index: 1;
  font-size: clamp(28px, 6vw, 62px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-align: center;
  color: #87ceeb;
  margin-bottom: 12px;
  padding: 0 16px;
`;

const Subtitle = styled.p`
  position: relative;
  z-index: 1;
  font-size: clamp(13px, 2vw, 15px);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.10px;
  text-align: center;
  color: #a9a9a9;
  margin: 0 auto 28px;
  max-width: 720px;
  padding: 0 14px;
`;

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [type] = useContext(DataContext);

    const getData = useCallback(async (page = 1) => {
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
      }, [type]);

      useEffect(() => {
        getData();
      }, [getData]);

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
