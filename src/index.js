import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import "fontsource-roboto/latin-300-normal.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
