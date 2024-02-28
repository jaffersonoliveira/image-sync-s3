import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function StatusBar() {
    return <Box width='100%'><LinearProgress style={{height:'10px'}} variant="determinate" value={99} /></Box>
} 

export default StatusBar