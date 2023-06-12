import "../styles/globals.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactElement } from "react";

import type { AppProps } from "next/app";
import { EntriesProvider } from "../context/entries/EntriesProvider";
import { UIProvider } from "../context/ui/UIProvider";
import darkTheme from "./themes/dark-theme";
import lightTheme from "./themes/light-theme";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp;
