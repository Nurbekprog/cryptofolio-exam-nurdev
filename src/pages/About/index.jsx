import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Loader from "../../components/Loader";
import Chart from "../../components/Chart";
import { formatNumber, currencyType, radioButtons } from "../../utils";
import parse from "html-react-parser";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  max-width: 1280px;
  width: 100%;
  gap: 30px;
  margin: 24px auto 50px;
  padding: 0 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 14px;
  }
`;

const DetailWrapper = styled.div`
  border-right: 2px solid #808080;
  display: flex;
  max-width: 360px;
  width: 32%;
  min-height: 630px;
  height: auto;
  flex-direction: column;
  padding: 0px 20px;
  img {
    margin: 0px auto;
  }

  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #808080;
    padding: 0 0 24px;
  }
`;

const DetailTitle = styled.h3`
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  color: white;
  margin: 20px 0px;
  max-width: 545px;
  width: 100%;
`;
const DetailDescription = styled.p`
  max-width: 545px;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  margin-bottom: 30px;

  @media (max-width: 420px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;
const DetailText = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 32.02px;
    text-align: left;
    margin-bottom: 8px;
  }
  span {
    line-height: 32.02px;
    text-align: left;
    letter-spacing: 2.5px;
    font-size: 18px;
  }

  @media (max-width: 420px) {
    h3 {
      font-size: 16px;
      line-height: 1.3;
    }

    span {
      font-size: 15px;
      line-height: 1.3;
      letter-spacing: 0.3px;
    }
  }
`;
const SelectPrice = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  input {
    display: none;
  }
  label {
    display: inline-block;
    padding: 11px 16px;
    min-width: 120px;
    border: 1px solid #87ceeb;
    height: auto;
    border-radius: 6px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    text-align: center;
    cursor: pointer;
    flex: 1 1 calc(50% - 6px);
  }
  input[type="radio"]:checked + label {
    background-color: #87ceeb;
    color: black;
    font-weight: 700;
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

function About() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [time, setTime] = useState("24");
  const [loading, setLoading] = useState(false);
  const [type] = useContext(DataContext);
  const { id } = useParams();
  const currency = type.toLowerCase();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const description = product?.description?.en
    ? String(product.description.en).split(".")[0]
    : "No description available.";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          <DetailWrapper>
            <img src={product?.image?.large} width={180} alt="" />
            <DetailTitle>{product?.name}</DetailTitle>
            <DetailDescription>{parse(`${description}`)}</DetailDescription>
            <DetailText>
              <h3> Rank :</h3>
              <span> {product?.market_cap_rank}</span>
            </DetailText>
            <DetailText>
              <h3>Current Price:</h3>
              <span>
                {currencyType(type)}
                {formatNumber(product?.market_data?.current_price[currency])}
              </span>
            </DetailText>

            <DetailText>
              <h3> Market Cap:</h3>
              <span>
                {currencyType(type)}
                {formatNumber(product?.market_data?.market_cap?.[currency])}
              </span>
            </DetailText>
          </DetailWrapper>
          <ColumnWrapper>
            <Chart id={id} days={time} />
            <SelectPrice>
              {radioButtons.map((button) => (
                <div key={button.id}>
                  <input
                    type="radio"
                    id={button.id}
                    name="priceType"
                    value={button.value}
                    checked={time === button.value}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <label htmlFor={button.id}>{button.label}</label>
                </div>
              ))}
            </SelectPrice>
          </ColumnWrapper>
        </Wrapper>
      )}
    </>
  );
}

export default About;
