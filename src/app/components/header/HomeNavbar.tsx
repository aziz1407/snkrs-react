import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React from "react";
import { CartItem } from "../../../lib/data/types/search";
import { useGlobals } from "../../../app/hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useThemeMode } from "../../../app/context/ThemeModeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  
  const { authMember } = useGlobals();
  const { mode, toggleColorMode } = useThemeMode(); // Using the theme mode context

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName={"underline"}>
                Kicks
              </NavLink>
            </Box>
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/about" activeClassName={"underline"}>
                About
              </NavLink>
            </Box>
            
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/* Toggle Button */}
            <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={toggleColorMode} // Trigger theme change on button click
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  color: mode === "dark" ? "white" : "black", 
                }}
              >
                {mode === "dark" ? (
                  <LightModeIcon sx={{ mr: 1 }} />
                ) : (
                  <DarkModeIcon sx={{ mr: 1 }} />
                )}
              </Button>

              {!authMember ? (
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <Button
                    variant="contained"
                    className="login-button"
                    onClick={() => setLoginOpen(true)}
                  >
                    <LoginIcon sx={{ mr: 1 }} />
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    className="signup-button"
                    onClick={() => setSignupOpen(true)}
                  >
                    <PersonAddIcon sx={{ mr: 1 }} />
                    SignUp
                  </Button>
                </Box>
              ) : (
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                />
              )}
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                },
              }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className="detail">
            <Box className={"head-main-txt"}>Passion led you here...</Box>
            <Box className={"welcome-txt"}>Let's find your new pair</Box>
          </Stack>
          <Box className="logo-frame">
            <div className={"logo-img"}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

