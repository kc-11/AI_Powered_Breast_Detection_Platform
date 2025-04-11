import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0A2463" },
    secondary: { main: "#3A7D7F" },
    error: { main: "#FF6B6B" },
    background: { default: "#F8F9FA" },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 8 },
      },
    },
  },
});

export default theme;
