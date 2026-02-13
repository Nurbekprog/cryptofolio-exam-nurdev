import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Loader from "../../components/Loader";
import Chart from "../../components/Chart";
import { formatNumber, currencyType } from "../../utils";
import parse from "html-react-parser";
import styled from "@emotion/styled";
import { CoinGeckoService } from "../../services/api";
import SEO from "../../components/SEO";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const radioButtons = [
  { id: "24h", value: "1", label: "24H" },
  { id: "30d", value: "30", label: "30D" },
  { id: "3m", value: "90", label: "3M" },
  { id: "1y", value: "365", label: "1Y" },
];

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 360px) {
    padding: 12px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-family-secondary);
  font-weight: 500;
  margin-bottom: 24px;
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 360px) {
    padding: 16px;
  }
`;

const CoinHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  
  img {
    margin-bottom: 16px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  }
  
  h1 {
    font-family: var(--font-family-primary);
    font-size: 32px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  span {
    background: rgba(252, 213, 53, 0.1);
    color: var(--accent-color);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
  
  span:first-of-type {
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  span:last-of-type {
    color: var(--text-primary);
    font-weight: 600;
    font-family: var(--font-family-secondary);
  }
`;

const Description = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 14px;
  margin-top: 24px;
  
  a {
    color: var(--accent-color);
  }
`;

const ChartControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-end;
`;

const TimeButton = styled.button`
  background: ${props => props.active ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.active ? '#000' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'var(--border-color)'};
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--accent-color);
    color: ${props => props.active ? '#000' : 'var(--text-primary)'};
  }
`;

function About() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [time, setTime] = useState("1");
  const [loading, setLoading] = useState(false);
  const [type] = useContext(DataContext);
  const { id } = useParams();
  const currency = type.toLowerCase();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(CoinGeckoService.getSingleCoin(id))
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const description = product?.description?.en
    ? String(product.description.en).split(". ")[0] + "."
    : "No description available.";

  return (
    <>
      <SEO 
        title={product?.name ? `${product.name} | Cryptofolio` : "Coin Details"}
        description={description}
      />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <BackButton onClick={() => navigate('/')}>
            <ArrowBackIcon fontSize="small" />
            Back to Home
          </BackButton>
          
          <DashboardGrid>
            {/* Sidebar with Coin Info */}
            <Sidebar>
              <Card>
                <CoinHeader>
                  <img src={product?.image?.large} width={100} alt={product?.name} />
                  <h1>{product?.name}</h1>
                  <span>Rank #{product?.market_cap_rank}</span>
                </CoinHeader>
                
                <StatRow>
                  <span>Current Price</span>
                  <span>
                    {currencyType(type)}
                    {product?.market_data?.current_price && formatNumber(product.market_data.current_price[currency])}
                  </span>
                </StatRow>
                <StatRow>
                  <span>Market Cap</span>
                  <span>
                    {currencyType(type)}
                    {product?.market_data?.market_cap && formatNumber(product.market_data.market_cap[currency])}
                  </span>
                </StatRow>
                
                <Description>{parse(description)}</Description>
              </Card>
            </Sidebar>

            {/* Main Content with Chart */}
            <MainContent>
              <Card style={{ height: '100%', minHeight: '500px' }}>
                <h3 style={{ fontFamily: 'var(--font-family-primary)', fontSize: '20px', marginBottom: '20px' }}>
                  Price Chart ({type})
                </h3>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <Chart id={id} days={time} />
                </div>
                <ChartControls>
                  {radioButtons.map((button) => (
                    <TimeButton 
                      key={button.id}
                      active={time === button.value}
                      onClick={() => setTime(button.value)}
                    >
                      {button.label}
                    </TimeButton>
                  ))}
                </ChartControls>
              </Card>
            </MainContent>
          </DashboardGrid>
        </Container>
      )}
    </>
  );
}

export default About;
