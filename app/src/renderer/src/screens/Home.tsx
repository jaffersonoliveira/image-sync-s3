// Importar React e os componentes necessários do Material-UI
import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import LandscapeIcon from '@mui/icons-material/Landscape'; // Importando o ícone

const HomeScreen = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LandscapeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Bem-vindo(a) ao Sistema
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sua plataforma para gerenciamento de arquivos dicom.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Comece Agora
        </Button>
      </Box>
    </Container>
  );
};

export default HomeScreen;
