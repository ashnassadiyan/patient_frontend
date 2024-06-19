import { createTheme } from "@mui/material";
import { blue, lightBlue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: "#191919",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
