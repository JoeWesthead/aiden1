import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { AppRoutes } from './routes';
import { ConfigProvider } from './context/ConfigContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <BrowserRouter>
          <CssBaseline />
          <Box display="flex" minHeight="100vh">
            <Sidebar />
            <Box component="main" flexGrow={1} height="100vh" overflow="auto">
              <AppRoutes />
            </Box>
          </Box>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
}