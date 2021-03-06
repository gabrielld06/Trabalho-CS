import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SupimpaLogo from '../../assets/supimpa.png'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn, getUserInfos } from '../../controller/userInfosController';

import './style.css'

const settingsOptions = [['Perfil', 'Minhas compras', 'Sair'], ['Perfil', 'Meus Eventos', 'Minhas compras', 'Sair'], ['Perfil', 'Minhas palestras', 'Minhas compras', 'Sair']];
const userType = {'espectador' : 0, 'criadorDeEvento' : 1, 'apresentador': 2};
var settings = [];

const Header = () => {
  const [userLogged, setUserLogged] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    setUserLogged(isUserLoggedIn());
  }, [userLogged])

  if(userLogged) {
    const userAccountType = getUserInfos().userType;
    settings = settingsOptions[userType[userAccountType]];
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuClick = (option) => {
    if (option === "Sair"){
      localStorage.removeItem("userInfos");
      navigate("/login")
    }
    if (option === "Perfil"){
      navigate("/myProfile");
    }
    if (option === "Meus Eventos"){
      navigate("/myEvents")
    }
    if (option === "Minhas palestras"){
      navigate("/myPresentations")
    }
    if (option === "Minhas compras"){
      navigate("/myTickets")
    }
    setAnchorElUser(null);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className='gridClass'
      >
        <IconButton component={Link} to="/">
          <Tooltip title="Home" >
            <img src={SupimpaLogo} className={'homeIcon'} alt="homeIcon"></img>
          </Tooltip>
        </IconButton>

        {
          (!userLogged ?
            /* Signup / Login option */
            <Box container sx={{ height: '100%', width: '200px' }}>
              <Grid container justifyContent="space-evenly">
                <IconButton component={Link} to="/signup">
                  <Typography textAlign="center" style={{ color: "white" }}>Cadastrar</Typography>
                </IconButton>
                <Divider orientation="vertical" style={{ background: 'white' }} flexItem />
                <IconButton component={Link} to="/login">
                  <Typography textAlign="center" style={{ color: "white" }}>Logar</Typography>
                </IconButton>
              </Grid>
            </Box>
            :
            /* User profile menubar */
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings" className='icon'>
                <IconButton onClick={handleOpenUserMenu} className='icon'>
                  <AccountCircleIcon sx={{ color: "white" }} style={{ height: '50px', width: '50px' }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {handleMenuClick(setting)}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )
        }
      </ Grid>
    </AppBar>
  );
};

export default Header;