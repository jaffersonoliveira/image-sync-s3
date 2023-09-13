import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import AppRoutes from './AppRoutes';

const MainComponent = () => (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>
)

function appRender() {
  ReactDOM.createRoot(document.getElementById('root')).render((<MainComponent />));
}

appRender();