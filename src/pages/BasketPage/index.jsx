import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const BasketPage = ({
  basketData,
  onUpdateProduct,
  onEmptyBasket,
  onRemoveItemFromBasket,
}) => {
  if (!basketData?.line_items || !basketData?.line_items.length) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Container id="basket">
        <Grid container justifyContent="center" spacing={4}>
          {basketData.line_items.map((product) => {
            return (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card className="custom-card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="260"
                      className="card-image"
                      image={product.image?.url}
                      title="Contemplative Reptile"
                    />

                    <CardContent className="content">
                      <Typography
                        className="title"
                        gutterBottom
                        variant="h5"
                        component="h5"
                      >
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <Typography
                      className="basket-item-price"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {product.price.formatted_with_symbol}
                    </Typography>
                  </CardActions>

                  <CardActions className="actions-content">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        onRemoveItemFromBasket(product.id);
                      }}
                    >
                      Remove
                    </Button>

                    <>
                      <Button
                        size="small"
                        variant="outlined"
                        className="increase-product-quantity"
                        onClick={() => {
                          onUpdateProduct(product.id, product.quantity + 1);
                        }}
                      >
                        +
                      </Button>
                      <Typography>&nbsp;{product.quantity}&nbsp;</Typography>
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          onUpdateProduct(product.id, product.quantity - 1);
                        }}
                      >
                        -
                      </Button>
                    </>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <div className="actions">
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={onEmptyBasket}
          >
            Empty Basket
          </Button>

          <Button
            size="small"
            variant="contained"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </Container>
    );
  }
};

export default BasketPage;
