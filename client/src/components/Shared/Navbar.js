import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
          >
            Blood Bank
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
                <MenuItem component={Link} to="/find-donors" onClick={handleMenuClose}>Find Donors</MenuItem>
                {isAuthenticated && (
                  <MenuItem onClick={handleUserMenuOpen}>
                    <Avatar alt={user.name} src={user.profilePicture} sx={{ mr: 1 }} />
                    {user.name}
                  </MenuItem>
                )}
              </Menu>
              <Menu
                id="user-menu"
                anchorEl={userMenuAnchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
              >
                <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>Profile</MenuItem>
                <MenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ display: 'flex', flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/find-donors">
                Find Donors
              </Button>
              {isAuthenticated && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton color="inherit" onClick={handleUserMenuOpen}>
                    <Avatar alt={user.name} src={user.profilePicture} />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={userMenuAnchorEl}
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
