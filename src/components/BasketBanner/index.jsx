import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import "./style.css";

const BasketBanner = () => {
  return (
    <div className="basket-banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Basket is empty press Shopping for adding new products
            </Typography>
            <Button className="shopping-button" component={Link} to="/">
              Shopping
            </Button>
          </Grid>

          <Grid item className="brand" xs={12} sm={6}>
            <ShoppingCart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BasketBanner;
