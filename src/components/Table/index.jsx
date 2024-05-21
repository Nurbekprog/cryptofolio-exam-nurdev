/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { Container, formatNumber, currencyType } from "../../utils";
import viewed from "../../assets/images/viewed.svg";
import unviewed from "../../assets/images/unviewed.svg";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack, PaginationItem} from "@mui/material";

const Wrapper = styled.div`
  padding: 0px 24px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 34px;
  font-weight: 400;
  line-height: 42px;
  letter-spacing: 0.25px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 13px;
`;

const Search = styled.input`
  color: #ffffff;
  width: 100%;
  padding: 25px 14px 20px;
  background-color: transparent;
  border: 1px solid #4a4c4f;
  border-radius: 7px;
  margin-bottom: 20px;
  &::placeholder {
    font-family: Roboto, sans-serif;
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
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

const PaginationS = styled(PaginationItem)`
  color: #ffffff;
  && {
    background-color: ${(props) => {
      let page = 1;
      if (localStorage.getItem("page")) {
        page = localStorage.getItem("page");
      }

      if (page == props.page) {
        props.selected = true;
      } else {
        props.selected = false;
      }
      return props.selected ? "#3A3B3F" : "inherit";
    }};
  }
`;

function Table({ data, fetchData }) {
  const products = data;
  const navigate = useNavigate();
  const [type, setType, watch, setWatch] = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(null);
  console.log("page", page);
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
    if (localStorage.getItem("page")) {
      console.log(localStorage.getItem("page"));
      setPage(localStorage.getItem("page"));
    } else {
      setPage(1);
    }
  }, []);

  function handleChange(event, value) {
    console.log(206, value);
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
              e.preventDefault();
              setSearch(e.target.value);
            }}
            placeholder="Search For a Crypto Currency.."
          />
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
                  .map((product, index) => {
                    let percents = Number(
                      product.price_change_percentage_24h
                    ).toFixed(2);
                    const isExist = storedData.some(
                      (item) => item.id === product.id
                    );
                    return (
                      <TableRow
                        key={index}
                        onClick={() => {
                          handleNavigate(product.id, product);
                        }}
                      >
                        <TableData>
                          <TableInfo>
                            <img
                              src={product.image}
                              alt={product.name}
                              width={50}
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
                              onClick={() => {
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
          <Footer>
            <Stack spacing={2}>
              <Pagination
                count={10}
                onChange={handleChange}
                renderItem={(item) => (
                  <PaginationS
                    {...item}
                  />
                )}
              />
            </Stack>
          </Footer>
        </Wrapper>
      </Container>
    </>
  );
}

export default Table;
