/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children}) => {
    const [type, setType] = useState(localStorage.getItem("type") || "USD");
    const [watch, setWatch] = useState(
        JSON.parse(localStorage.getItem("watchList")) || []
    );

    useEffect(() => {
        localStorage.setItem("type", type);
    }, [type]);

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watch));
    }, [watch]);

    return (
        <DataContext.Provider value={[type, setType, watch, setWatch]}>
            {children}
        </DataContext.Provider>
    )
}
