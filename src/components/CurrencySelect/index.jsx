import { Select, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function CurrencySelect() {
  const [type, setType] = useContext(DataContext);
  return (
    <ThemeProvider theme={darkTheme}>
      <Select
      sx={{ width: { xs: 96, sm: 95 }, height: 40 }}
      value={type}
      onChange={(e) => setType(e.target.value)}
      variant="outlined"
      labelId="demo-simple-select-label"
      id="demo-simple-select">
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="RUB">RUB</MenuItem>
      </Select>
    </ThemeProvider>
  );
}

export default CurrencySelect;
