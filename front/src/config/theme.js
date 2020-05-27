import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#14213D",
    },
    secondary: {
      main: "#FCA311",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

export default theme;
