import React from "react";
import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import "./style.css";

const NavBar = ({ basketItems, totalCost }) => {
  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src="https://raw.githubusercontent.com/DwinaTech/public-images/main/DwinaTech-brand.png"
                alt="DwinaTech lgo"
                height="25px"
                className="logo"
              />
            </Typography>

            <div className="basket-wrapper">
              <IconButton
                component={Link}
                to="/basket"
                aria-label="Show basket contents"
                color="inherit"
              >
                <Badge badgeContent={basketItems} color="secondary">
                  <ShoppingCart className="custom-basket" />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
