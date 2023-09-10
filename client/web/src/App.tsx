import AccountCircle from "@mui/icons-material/AccountCircle";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Alert,
  AppBar,
  Button,
  Chip,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ShoppingBasket } from "./ShoppingBasket/ShoppingBasket";
import { useShoppingBasket } from "./ShoppingBasket/useShoppingBasket";
import { useQuery } from "@apollo/client";
import { getProductsQuery } from "./Store";
import { GetProductsQuery } from "../../generated/graphql";

export function App() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const { shoppingBasket, addItem, removeItem, clearBasket } =
    useShoppingBasket();

  const { data: productsData } = useQuery<GetProductsQuery>(getProductsQuery);

  const totalItemCount = useMemo(() => {
    return shoppingBasket.reduce((sum, item) => {
      return sum + item.amount;
    }, 0);
  }, [shoppingBasket]);

  const totalSum = useMemo(() => {
    return shoppingBasket.reduce((sum, item) => {
      return (
        sum +
        (productsData?.products.find((product) => product.ean === item.ean)
          ?.price ?? 0) *
          item.amount
      );
    }, 0);
  }, [shoppingBasket]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackBarOpen(false);
  };

  const handleOrdersClick = () => {
    handleClose();
    navigate("/orders");
  };

  const handleOrderSuccess = () => {
    setIsSnackBarOpen(true);
    setIsDrawerOpen(false);
    navigate("/orders");
    clearBasket();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar>
          <Typography
            color="green"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
            onClick={() => navigate("/")}
          >
            Minishop
          </Typography>
          {shoppingBasket.length > 0 && (
            <Button
              size="small"
              variant="contained"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ marginRight: "1rem", textTransform: "unset" }}
            >
              <Chip
                label={totalItemCount}
                size="small"
                color="info"
                sx={{ marginRight: "1rem" }}
              />
              <Typography variant="body2" sx={{ marginRight: "2rem" }}>
                View Order
              </Typography>
              <Typography variant="body2">€{totalSum.toFixed(2)}</Typography>
            </Button>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="primary"
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
      <Container maxWidth="md">
        <Outlet context={{ shoppingBasket, addItem, removeItem }} />
      </Container>
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackBarOpen}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Order received!
        </Alert>
      </Snackbar>
    </>
  );
}
