import React, { useContext, useState } from "react";
import { Drawer } from "@mui/material";
import styles from "./index.module.css";
import { DataContext } from "../../context/DataContext";
import { currencyType, formatNumber } from "../../utils";

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
                width: { xs: "100%", sm: 420, md: 500 },
                maxWidth: "100%",
                backgroundColor: "#515151",
              },
            }}
          >
            <div className={styles.container}>
              <h3>WATCHLIST</h3>
              <div className={styles.cardWrapper}>
                {watch.length > 0 &&
                  watch.map((el, index) => {
                    return (
                      <div key={index} className={styles.coinWrapper}>
                        <img src={el.image} width={118} height={118} alt="" />
                        <p>
                          {currencyType(type)}
                          {formatNumber(el.current_price)}
                        </p>
                        <button
                          onClick={() => {
                            removeItem(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
      <button onClick={openModal} className={styles.button}>
        WATCH LIST
      </button>
    </div>
  );
}

export default WatchList;
