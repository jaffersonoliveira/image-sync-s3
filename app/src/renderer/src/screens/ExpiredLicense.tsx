import { Typography, Container, Box, Button } from '@mui/material';
import LandscapeIcon from '@mui/icons-material/Landscape'; // Importando o ícone
import React from 'react'

function ExpiredLicense() {
  return (
    <Container maxWidth="sm">
    <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <LandscapeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
      <Typography variant="h4" component="h1" gutterBottom>
        Sua licença Expirou
      </Typography>
      <Typography variant="body1" gutterBottom>
        Contact o suporte, adquira uma nova licença e continue a usar o sistema
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Entrar em contato
      </Button>
    </Box>
  </Container>
  )
}

export default ExpiredLicense