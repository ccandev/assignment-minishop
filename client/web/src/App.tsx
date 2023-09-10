import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useShoppingBasket } from "./ShoppingBasket/useShoppingBasket";
import { ShoppingBasket } from "./ShoppingBasket/ShoppingBasket";

export function App() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { shoppingBasket, addItem, removeItem, clearBasket } =
    useShoppingBasket();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrdersClick = () => {
    handleClose();
    navigate("/orders");
  };

  const handleOrderSuccess = () => {
    setIsDrawerOpen(false);
    navigate("/orders");
    clearBasket();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Minishop
          </Typography>
          {shoppingBasket.length > 0 && (
            <Button variant="contained" onClick={() => setIsDrawerOpen(true)}>
              View Order
            </Button>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleOrdersClick}>Orders</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet context={{ shoppingBasket, addItem, removeItem }} />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <ShoppingBasket
          products={shoppingBasket}
          handleSuccess={handleOrderSuccess}
        />
      </Drawer>
    </>
  );
}
