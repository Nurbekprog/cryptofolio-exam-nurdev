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
  max-width: 1280px;
  margin: 0 auto 40px;
  padding: 0 24px;
  
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const Title = styled.h2`
  font-family: var(--font-family-primary);
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 40px 0 32px;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 640px) {
    font-size: 24px;
    margin: 32px 0 24px;
  }
`;

const Search = styled.input`
  width: 100%;
  padding: 16px 20px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-family: var(--font-family-secondary);
  color: var(--text-primary);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(252, 213, 53, 0.1); /* Gold glow match */
    background-color: #1a2028;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-secondary);
  box-shadow: var(--shadow-md);

  @media (max-width: 700px) {
    display: none;
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 800px;
`;

const Thead = styled.thead`
  background-color: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--border-color);
  
  & tr th {
    color: var(--accent-color);
    font-family: var(--font-family-primary);
    font-weight: 700;
    font-size: 14px;
    padding: 20px 24px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: right;
    
    &:first-of-type {
      text-align: left;
    }
  }
`;

const TableHead = styled.th`
  border: none;
`;

const TableRow = styled.tr`
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(252, 213, 53, 0.03); /* Subtle accent tint */
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const TableData = styled.td`
  padding: 20px 24px;
  color: var(--text-primary);
  font-family: var(--font-family-secondary);
  font-size: 15px;
  font-weight: 500;
`;

const TableInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  & div h3 {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  & p {
    font-size: 14px;
    color: var(--text-secondary);
  }
`;

const CoinImage = styled.img`
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
`;

const TablePrice = styled.td`
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  padding: 20px 24px;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
`;

const TablePercents = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  p {
    font-weight: 600;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0;
`;

const MobileList = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;


const MobileCard = styled.div`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 360px) {
    padding: 16px;
  }
`;

const MobileHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
`;

const MobileCoin = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-primary);
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
  }
  
  @media (max-width: 360px) {
    gap: 8px;
    h3 { font-size: 16px; }
    p { font-size: 13px; }
  }
`;

const WatchIcon = styled.img`
  width: 24px;
  height: 24px;
  padding: 2px;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  
  @media (max-width: 360px) {
    gap: 8px;
  }
`;

const MobileCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    font-size: 12px;
    color: var(--text-secondary);
    text-transform: uppercase;
    font-weight: 600;
  }

  strong {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  &:nth-of-type(2) {
    text-align: center;
  }
  &:last-of-type {
    text-align: right;
  }
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
          <MobileList>
            {products &&
              products.length > 0 &&
              products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((product) => {
                  const percents = Number(
                    product.price_change_percentage_24h
                  ).toFixed(2);
                  const isExist = storedData.some(
                    (item) => item.id === product.id
                  );

                  return (
                    <MobileCard
                      key={`m-${product.id}`}
                      onClick={() => handleNavigate(product.id, product)}
                    >
                      <MobileHead>
                        <MobileCoin>
                          <CoinImage src={product.image} alt={product.name} />
                          <div>
                            <h3>{product.symbol}</h3>
                            <p>{product.name}</p>
                          </div>
                        </MobileCoin>
                        <WatchIcon
                          src={isExist ? viewed : unviewed}
                          alt="watch icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/crypto/${product.id}`);
                          }}
                        />
                      </MobileHead>
                      <MobileGrid>
                        <MobileCell>
                          <p>Price</p>
                          <strong>
                            {currencyType(type)}{" "}
                            {formatNumber(product.current_price.toFixed(2))}
                          </strong>
                        </MobileCell>
                        <MobileCell>
                          <p>24h</p>
                          <strong style={{ color: percents > 0 ? "var(--success-color)" : "var(--error-color)" }}>
                            {percents > 0 ? `+${percents}%` : `${percents}%`}
                          </strong>
                        </MobileCell>
                        <MobileCell>
                          <p>Market Cap</p>
                          <strong>
                            {currencyType(type)}{" "}
                            {formatNumber(product.market_cap.toString().slice(0, -6))}M
                          </strong>
                        </MobileCell>
                      </MobileGrid>
                    </MobileCard>
                  );
                })}
          </MobileList>
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
                          <TableData>
                            <TablePercents>
                              <img
                                src={isExist ? viewed : unviewed}
                                width={24}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/crypto/${product.id}`);
                                }}
                              />
                              <p>
                                {percents > 0 ? (
                                  <span style={{ color: "var(--success-color)" }}>+{percents}%</span>
                                ) : (
                                  <span style={{ color: "var(--error-color)" }}>{percents}%</span>
                                )}
                              </p>
                            </TablePercents>
                          </TableData>
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
                size="small"
                siblingCount={0}
                boundaryCount={1}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "var(--accent-color)",
                    fontFamily: "var(--font-family-primary)",
                    minWidth: { xs: 30, sm: 34 },
                    height: { xs: 30, sm: 34 },
                    borderRadius: "8px",
                    fontWeight: 600,
                  },
                  "& .Mui-selected": {
                    backgroundColor: "var(--accent-color) !important",
                    color: "#000 !important",
                    boxShadow: "var(--shadow-glow)",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "rgba(252, 213, 53, 0.1)",
                  }
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
