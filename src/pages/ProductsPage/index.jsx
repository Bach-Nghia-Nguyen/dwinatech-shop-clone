import React from "react";
import { Container, Grid } from "@mui/material";
import Product from "components/Product";
import Banner from "components/Banner";

const ProductsPage = ({ products }) => {
  return (
    <div>
      <Banner />
      <Container id="products">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ProductsPage;
