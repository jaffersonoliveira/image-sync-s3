import React from 'react';
import TopBar from './components/TopBar';
import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import StatusBar from './components/StatusBar';
import ExpiredLicense from './screens/ExpiredLicense';

function App() {
  const expirationDate = new Date('2024-03-24');
  const expiredLicense = expirationDate < new Date();
  const Body = ()=>{
    return(
      <>
        <TopBar />
        <Box p={3}>
          <Outlet />
        </Box>
      </>
    )};
  return (
    <>
      <Stack direction='column' >
        {expiredLicense?<ExpiredLicense/>:<Body/>}
        {/* <StatusBar /> */}
      </Stack>
    </>
  );
}

export default App;
