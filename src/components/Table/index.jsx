/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { Container, formatNumber, currencyType } from "../../utils";
import viewed from "../../assets/images/viewed.svg";
import unviewed from "../../assets/images/unviewed.svg";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";

const Wrapper = styled.div`
  padding: 0px 24px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const Title = styled.h2`
  font-size: clamp(25px, 4vw, 34px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.25px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 13px;
`;

const Search = styled.input`
  color: #ffffff;
  width: 100%;
  padding: 18px 14px;
  background-color: transparent;
  border: 1px solid #4a4c4f;
  border-radius: 7px;
  margin-bottom: 20px;
  font-size: 15px;
  &::placeholder {
    font-family: Roboto, sans-serif;
  }
`;

const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #4a4c4f;
  border-radius: 8px;
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 760px;
`;

const Thead = styled.thead`
  background-color: #87ceeb;
  border-radius: 15px;
  & tr {
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: black;
    & th:nth-of-type(1) {
      padding-left: 18px;
      width: 25%;
      border-top-left-radius: 7px;
      text-align: left;
    }
    & th:nth-of-type(2) {
      width: 20%;
      text-align: right;
    }
    & th:nth-of-type(3) {
      width: 22%;
      text-align: center;
    }
    & th:nth-of-type(4) {
      padding-right: 16px;
      width: 13%;
      text-align: right;
      border-top-right-radius: 7px;
    }
  }
`;

const TableHead = styled.th`
  padding: 19px 0px;
  border: none;
`;
const TableRow = styled.tr`
  cursor: pointer;
  border-bottom: 1px solid #4a4c4f;
  background-color: #16171a;
  & td:nth-of-type(2) {
    text-align: right;
  }
  & td:nth-of-type(3) {
    text-align: center;
  }
  & td:nth-of-type(4) {
    text-align: right;
    padding-right: 16px;
  }
`;

const TableData = styled.td`
  padding: 16px 16px 27px;
`;

const TableInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  & div h3 {
    font-size: 22px;
    font-weight: 400;
    line-height: 31.46px;
    letter-spacing: 0.15px;
    text-transform: uppercase;
  }
  & p {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.15px;
    color: #a9a9a9;
  }
`;

const CoinImage = styled.img`
  width: 50px;
  height: 50px;

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

const TablePrice = styled.td`
  font-size: 14px;
  font-weight: 400;
  line-height: 20.02px;
  letter-spacing: 0.15px;
  text-align: right;
`;

const TablePercents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  img {
    cursor: pointer;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 20.02px;
    letter-spacing: 0.15px;
    text-align: right;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

function Table({ data, fetchData }) {
  const products = data;
  const navigate = useNavigate();
  const [type, , watch, setWatch] = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  let storedData = watch;
  function handleNavigate(elID, el) {
    if (elID) {
      const isExist = storedData.some((item) => item.id === elID);
      if (isExist) {
        navigate(`crypto/${elID}`);
        return;
      }

      const updatedData = [...storedData, el];
      localStorage.setItem("watchList", JSON.stringify(updatedData));
      setWatch(updatedData);
      navigate(`crypto/${elID}`);
    }
  }

  useEffect(() => {
    const storedPage = Number(localStorage.getItem("page"));
    if (storedPage) {
      setPage(storedPage);
      fetchData(storedPage);
    }
  }, [fetchData]);

  function handleChange(_, value) {
    setPage(value);
    localStorage.setItem("page", value);
    fetchData(value);
    window.scrollTo(0, 350);
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Cryptocurrency Prices by Market Cap</Title>
          <Search
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search For a Crypto Currency.."
          />
          <TableScroll>
            <TableWrapper>
              <Thead>
                <tr>
                  <TableHead>Coin</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Changes</TableHead>
                  <TableHead>Market Cap</TableHead>
                </tr>
              </Thead>
              <tbody>
                {products &&
                  products.length > 0 &&
                  products
                    .filter((product) =>
                      product.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((product) => {
                      let percents = Number(
                        product.price_change_percentage_24h
                      ).toFixed(2);
                      const isExist = storedData.some(
                        (item) => item.id === product.id
                      );
                      return (
                        <TableRow
                          key={product.id}
                          onClick={() => {
                            handleNavigate(product.id, product);
                          }}
                        >
                          <TableData>
                            <TableInfo>
                              <CoinImage
                                src={product.image}
                                alt={product.name}
                              />
                              <div>
                                <h3>{product.symbol}</h3>
                                <p>{product.name}</p>
                              </div>
                            </TableInfo>
                          </TableData>
                          <TablePrice>
                            {currencyType(type)}{" "}
                            {formatNumber(product.current_price.toFixed(2))}
                          </TablePrice>
                          <td>
                            <TablePercents>
                              <img
                                src={isExist ? viewed : unviewed}
                                width={27}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/crypto/${product.id}`);
                                }}
                              />
                              <p>
                                {percents > 0 ? (
                                  <span style={{ color: "#0ECB81" }}>+{percents}%</span>
                                ) : (
                                  <span style={{ color: "#ff0000" }}>{percents}%</span>
                                )}
                              </p>
                            </TablePercents>
                          </td>
                          <TablePrice>
                            {currencyType(type)}{" "}
                            {formatNumber(
                              product.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TablePrice>
                        </TableRow>
                      );
                    })}
              </tbody>
            </TableWrapper>
          </TableScroll>
          <Footer>
            <Stack spacing={2}>
              <Pagination
                count={10}
                page={page}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#87ceeb",
                    fontFamily: "Montserrat",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#3a3b3f !important",
                    color: "#fff !important",
                  },
                }}
              />
            </Stack>
          </Footer>
        </Wrapper>
      </Container>
    </>
  );
}

export default Table;
