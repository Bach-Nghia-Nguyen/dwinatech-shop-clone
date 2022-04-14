import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { commerce } from "lib/commerce";
import ProductsPage from "pages/ProductsPage";
import BasketPage from "pages/BasketPage";
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
        console.log(response);
        setProducts((response && response.data) || []);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchBasketData = async () => {
      const response = await commerce.cart.retrieve();
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
        <NavBar basketItems={basketData.total_items} />
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
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
