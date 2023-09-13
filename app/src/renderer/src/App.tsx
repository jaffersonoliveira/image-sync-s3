import React from 'react';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

function App() {
  return (
    <>
      <Stack direction='column'>
        <TopBar />
        <Box>
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}

export default App;
