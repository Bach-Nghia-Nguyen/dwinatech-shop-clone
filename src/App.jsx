import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { commerce } from "lib/commerce";
import ProductsPage from "pages/ProductsPage";
import NavBar from "components/NavBar";
import "./App.css";
import Footer from "components/Footer";

const App = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <ProductsPage products={products} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
