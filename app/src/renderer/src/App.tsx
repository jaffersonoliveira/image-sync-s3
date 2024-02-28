import React from 'react';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import StatusBar from './components/StatusBar';

function App() {
  return (
    <>
      <Stack direction='column' >
        <TopBar />
        <Box p={3}>
          <Outlet />
        </Box>
        {/* <StatusBar /> */}
      </Stack>
    </>
  );
}

export default App;
