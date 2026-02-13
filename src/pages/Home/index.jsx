import styled from "@emotion/styled"
import Carousel from "../../components/Carousel"
import carouselBg from "../../assets/images/bgImage.jpg"
import Table from "../../components/Table"
import Loader from "../../components/Loader"
import useCoinData from "../../hooks/useCoinData"
import SEO from "../../components/SEO"

const CarouselBackground = styled.div`
  position: relative;
  background-image: url(${carouselBg});
  background-size: cover;
  background-position: center;
  min-height: 450px; /* Increased height for impact */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
  overflow: hidden;

  /* Premium Overlay */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(11, 14, 17, 0.85) 0%,
      rgba(11, 14, 17, 0.95) 100%
    );
    z-index: 0;
  }
  
  /* Accent Glow */
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -20%;
    width: 80%;
    height: 200%;
    background: radial-gradient(circle, rgba(252, 213, 53, 0.08) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 640px) {
    min-height: 400px;
    padding: 40px 0;
  }

  @media (max-width: 360px) {
    min-height: 350px;
    padding: 30px 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  
  @media (max-width: 360px) {
    padding: 0 16px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-family-primary);
  font-size: clamp(32px, 6vw, 72px); /* Smaller min font for mobile */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);

  span {
    color: var(--accent-color);
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 360px) {
    font-size: 28px;
    letter-spacing: -0.5px;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-family-secondary);
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 auto 48px;
  max-width: 600px;
  
  @media (max-width: 360px) {
    font-size: 13px;
    margin-bottom: 32px;
  }
`;

function Home() {
    const { products, loading, fetchCoins, page } = useCoinData();
    
   return (
    <>
      <SEO 
        title="Cryptofolio - Premium Tracking" 
        description="Real-time cryptocurrency tracking with professional insights." 
      />
      <CarouselBackground>
        <ContentWrapper>
          <Title>CRYPTOFOLIO <span>WATCH LIST</span></Title>
          <Subtitle>Get comprehensive real-time information regarding your favorite cryptocurrencies.</Subtitle>
          <Carousel data={products} />
        </ContentWrapper>
      </CarouselBackground>
      
      {loading && products.length === 0 ? (
          <Loader/>
      ) : (
          <Table data={products} fetchData={fetchCoins} page={page} />
      )}
    </>
  )
}

export default Home
