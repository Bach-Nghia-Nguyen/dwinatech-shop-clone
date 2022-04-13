import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import logo from "assets/images/Canon-Kit.png";
import "./style.css";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography className="title" variant="h1">
              Welcome to DwinaTech Shop
            </Typography>
            <Button className="shopping-button" href="#products">
              Shopping
            </Button>
          </Grid>

          <Grid className="brand" item sm={6}>
            <img src={logo} alt="Brand-tv" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
