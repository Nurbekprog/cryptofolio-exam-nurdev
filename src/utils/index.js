import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`;

export function currencyType(type) {
  if(type === "USD") {
    return "$"
  }else if(type === "RUB") {
    return "₽";
  }else if(type === "EUR") {
    return "€";
  }
}

export const radioButtons = [
  { id: "option1", label: "24 Hours", value: "24" },
  { id: "option2", label: "30 Days", value: "30" },
  { id: "option3", label: "3 Month", value: "90" },
  { id: "option4", label: "1 Year", value: "365" },
];


export function formatNumber(number) {
    if (!number) return null; 
  
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return parts.join(".");
  }

  