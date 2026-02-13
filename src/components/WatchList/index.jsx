import React, { useContext, useState } from "react";
import { Drawer } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import { currencyType, formatNumber } from "../../utils";
import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const WatchListButton = styled.button`
  background-color: var(--accent-color);
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-family: var(--font-family-primary);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  height: 40px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(135, 206, 235, 0.2);

  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(135, 206, 235, 0.3);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  background-color: #2a2c32; /* Darker, more consistent background */
  color: #fff;
  position: relative;
  
  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 32px;
    letter-spacing: 1px;
    color: var(--text-primary);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    transform: scale(1.1);
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* Better grid layout */
  gap: 20px;
  width: 100%;
  overflow-y: auto;
  padding: 4px; /* Prevent shadow clipping */
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 4px;
  }
`;

const CoinCard = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(145deg, #232529, #1a1c20);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.4);
    border-color: rgba(135, 206, 235, 0.2);
  }

  /* Decorative glow */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(135, 206, 235, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  img {
    margin-bottom: 4px;
    z-index: 1;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  p {
    z-index: 1;
    font-weight: 700;
    font-size: 18px;
    color: var(--text-primary);
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
`;

const RemoveButton = styled.button`
  z-index: 1;
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4d4d;
  border: 1px solid rgba(255, 0, 0, 0.2);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-family-secondary);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
  
  &:hover {
    background-color: #ff4d4d;
    color: white;
    box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  }
`;

function WatchList() {
  const [state, setState] = useState({
    right: false,
  });
  const [type, , watch, setWatch] = useContext(DataContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const openModal = () => {
    setState({ ...state, right: true });
  };

  const removeItem = (index) => {
    const deleteWatchItem = [...watch];
    deleteWatchItem.splice(index, 1);
    localStorage.setItem("watchList", JSON.stringify(deleteWatchItem));
    setWatch(deleteWatchItem);
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: {
                width: { xs: "100%", sm: 420 },
                maxWidth: "100%",
                backgroundColor: "#2a2c32", // Match container bg
                backgroundImage: 'none' // Remove default MUI overlay
              },
            }}
          >
            <Container>
              <CloseButton onClick={toggleDrawer(anchor, false)}>
                <CloseIcon />
              </CloseButton>
              <h3>WATCHLIST</h3>
              <CardWrapper>
                {watch.length > 0 ? (
                  watch.map((el, index) => {
                    return (
                      <CoinCard key={index}>
                        <img src={el.image} width={64} height={64} alt={el.name} />
                        <p>
                          {currencyType(type)}
                          {formatNumber(el.current_price?.toFixed(2))}
                        </p>
                        <RemoveButton
                          onClick={() => {
                            removeItem(index);
                          }}
                        >
                          <DeleteOutlineIcon style={{ fontSize: 16 }} />
                          Remove
                        </RemoveButton>
                      </CoinCard>
                    );
                  })
                ) : (
                  <div style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    marginTop: '40px',
                    color: 'var(--text-secondary)'
                  }}>
                    <p style={{ fontSize: '16px', marginBottom: '8px' }}>Your watchlist is empty</p>
                    <p style={{ fontSize: '14px', opacity: 0.7 }}>Add coins to track them here</p>
                  </div>
                )}
              </CardWrapper>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
      <WatchListButton onClick={openModal}>
        WATCH LIST
      </WatchListButton>
    </div>
  );
}

export default WatchList;
