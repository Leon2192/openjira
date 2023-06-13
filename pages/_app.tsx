import "../styles/globals.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { ReactElement } from "react";

import type { AppProps } from "next/app";
import { EntriesProvider } from "../context/entries/EntriesProvider";
import { SnackbarProvider } from 'notistack'
import { UIProvider } from "../context/ui/UIProvider";
import darkTheme from "../themes/dark-theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
