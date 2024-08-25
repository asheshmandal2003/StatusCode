import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/auth";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleLogout = () => {
    handleUserMenuClose();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="error">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Sparsh
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
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                {!user && (
                  <>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={handleMenuClose}
                    >
                      Register
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleMenuClose}
                    >
                      Login
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  component={Link}
                  to="/find-donors"
                  onClick={handleMenuClose}
                >
                  Find Donors
                </MenuItem>
                {user && (
                  <MenuItem onClick={handleUserMenuOpen}>
                    <Avatar
                      alt="avatar"
                      src={profile ? profile.avatar_url : ""}
                      sx={{ mr: 1 }}
                    />
                  </MenuItem>
                )}
              </Menu>
              <Menu
                id="user-menu"
                anchorEl={userMenuAnchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleUserMenuClose}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div style={{ display: "flex", flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
                Home
              </Button>
              {!user && (
                <>
                  {" "}
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{ mr: 2 }}
                  >
                    Register
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{ mr: 2 }}
                  >
                    Login
                  </Button>
                </>
              )}
              {user && (
                <Button color="inherit" component={Link} to="/find-donors">
                  Find Donors
                </Button>
              )}
              {user && (
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  <IconButton color="inherit" onClick={handleUserMenuOpen}>
                    <Avatar
                      alt="avatar"
                      src={profile ? profile.avatar_url : ""}
                    />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={userMenuAnchorEl}
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleUserMenuClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
