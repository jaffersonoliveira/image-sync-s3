import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

function myrender() {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
    , document.body);
}

myrender();