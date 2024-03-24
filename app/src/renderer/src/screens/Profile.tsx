import React from 'react';
import { Container, Box, Typography, Avatar, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Ícone padrão para perfil

const ProfileScreen = () => {
  // Dados fictícios do usuário para demonstração
  const user = {
    name: "João Silva",
    email: "joao.silva@example.com",
    profilePic: "https://via.placeholder.com/150", // Um placeholder para a imagem de perfil
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ my: 4, p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Exibir Avatar com a imagem de perfil do usuário */}
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src={user.profilePic}
            alt="Foto de Perfil"
          />
          <Typography variant="h5" component="h2">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Editar Perfil
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileScreen;
