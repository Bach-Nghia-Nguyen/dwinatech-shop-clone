import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { commerce } from "lib/commerce";
import ProductsPage from "pages/ProductsPage";
import BasketPage from "pages/BasketPage";
import CheckoutPage from "pages/CheckoutPage";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketData, setBasketData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await commerce.products.list();
      if (response) {
        setProducts((response && response.data) || []);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchBasketData = async () => {
      const response = await commerce.cart.retrieve();
      console.log("basketData", response);
      setBasketData(response);
    };
    fetchBasketData();
  }, []);

  const handleAddProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response.cart);
  };

  const handleUpdateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response.cart);
  };

  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response.cart);
  };

  const handleRemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response.cart);
  };

  // console.log("basketData:", basketData);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          basketItems={basketData.total_items}
          totalCost={
            (basketData.subtotal &&
              basketData.subtotal.formatted_with_symbol) ||
            "00.00"
          }
        />
        <Switch>
          <Route exact path="/">
            <ProductsPage products={products} onAddProduct={handleAddProduct} />
          </Route>
          <Route exact path="/basket">
            <BasketPage
              basketData={basketData}
              onUpdateProduct={handleUpdateProduct}
              onEmptyBasket={handleEmptyBasket}
              onRemoveItemFromBasket={handleRemoveItemFromBasket}
            />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage basketData={basketData} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
