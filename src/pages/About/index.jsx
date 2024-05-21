/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
  max-width: 1880px;
  width: 100%;
  gap: 30px;
  margin: 25px auto 50px;
  @media screen and (max-width: 1400px) {
    justify-content: space-between;
  }
`;

const DetailWrapper = styled.div`
  border-right: 2px solid #808080;
  display: flex;
  max-width: 25%;
  width: 100%;
  min-height: 630px;
  height: auto;
  flex-direction: column;
  padding: 0px 20px;
  img {
    margin: 0px auto;
  }
`;

const DetailTitle = styled.h3`
  font-size: 48px;
  font-weight: 700;
  line-height: 56.02px;
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
`;
const DetailText = styled.div`
  display: flex;
  gap: 7px;
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
`;
const SelectPrice = styled.div`
  width: 73%;
  display: flex;
  gap: 38px;
  input {
    display: none;
  }
  label {
    display: inline-block;
    padding: 11px 21px;
    width: 220px;
    border: 1px solid #87ceeb;
    height: 41px;
    border-radius: 6px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.5px;
    text-align: left;
    cursor: pointer;
  }
  input[type="radio"]:checked + label {
    background-color: #87ceeb;
    color: black;
    font-family: 700;
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function About() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [time, setTime] = useState("24");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useContext(DataContext);
  const { id } = useParams();
  const currency = type.toLowerCase();
  console.log(product);

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
  }, []);

  let description = String(product?.description?.en).split(".")[0];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          <DetailWrapper>
            <img src={product?.image?.large} width={200} alt="" />
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
                {formatNumber(product.market_data?.market_cap[currency])}
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
