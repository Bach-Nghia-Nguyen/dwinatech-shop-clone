import React from "react";
import Product from "components/Product";
import { Container, Grid } from "@mui/material";

const ProductsPage = ({ products }) => {
  return (
    <div>
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
