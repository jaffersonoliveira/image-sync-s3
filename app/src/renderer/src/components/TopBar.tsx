import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { Autorenew, } from '@mui/icons-material';
import { Button, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function TopBar() {
  const navigate = useNavigate()

  const [modalidade, setModalidade] = useState('0');
  const [estudo, setEstudo] = useState('');
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = ()=>{
    const search: {
      study_date?: string;
      modality?: string;
      patient_id?: string;
      patient_name?: string;
    } = {}
    nome ? search.patient_name = nome : '';
    (modalidade && modalidade != '0') ? search.modality = modalidade : ''
    estudo ?  search.study_date = estudo : ''
    id ? search.patient_id = id : ''
    Object.keys(search).length > 0 && window.electronAPI.search(search); 
    navigate('/search-result')    
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {/* <MenuItem onClick={()=>navigate('/setup')}>Setup</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
{/*       <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => window.electronAPI.file_sync() }
          >
            <Autorenew />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={()=>navigate('/')}
            style={{cursor:'pointer'}}
          >
            DICOM SYNC
          </Typography>
          <Stack 
            direction='row' 
            sx={{ flexGrow: 1 }} 
            paddingLeft={5}
            margin={2} 
            spacing={2}
          >
            <Select 
              label='Modalidade'
              placeholder='Modalidade'
              value={modalidade}
              onChange={(e)=>setModalidade(e.target.value)}
            >
              <MenuItem value='0'>Modalidade</MenuItem>
              <MenuItem value='CT'>CT</MenuItem>
              <MenuItem value='CR'>CR</MenuItem>
              <MenuItem value='DX'>DX</MenuItem>
            </Select>
            <TextField type='date' placeholder='Estudo' value={estudo} onChange={(e)=>setEstudo(e.target.value)}/>
            <TextField type='text' placeholder='Nome' value={nome} onChange={(e)=>setNome(e.target.value)} />
            <TextField type='text' placeholder='Id' value={id} onChange={(e)=>setId(e.target.value)}/>
            <Button variant='contained' style={{backgroundColor: '#455a64', borderRadius: 10}} onClick={handleSearch}>
              <SearchIcon/>     
            </Button>
{/*             <StyledInputBase    
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(e)=> {(e.code==='Enter') && window.electronAPI.search({patient_name: "%maria%", modality: "DX", study_date: '2024-03-28'}); navigate('/search-result')}} //e.currentTarget.value
            /> */}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
{/*             <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle onClick={()=>navigate('/profile')} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}