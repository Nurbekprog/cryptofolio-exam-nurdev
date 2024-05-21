/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children}) => {
    const [type, setType] = useState(localStorage.getItem("type") || "USD");
    const [watch, setWatch] = useState(
        JSON.parse(localStorage.getItem("watchList")) || []
    );

    return (
        <DataContext.Provider value={[type, setType, watch, setWatch]}>
            {children}
        </DataContext.Provider>
    )
}