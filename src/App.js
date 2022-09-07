import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import TopBar from "./screens/top-bar";
import Home from "./screens/home/home";
import Footer from "./screens/footer";
import AboutUs from "./screens/about-us";
import ContactUs from "./screens/contact-us";
import FavorScreen from "./screens/favorScreen";
import ArticlesScreen from "./screens/articlesScreen";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  const [active, setActive] = useState("home");
  const redirect = window.location.pathname.split("/")[1];

  useEffect(() => {
    if (
      [
        "home",
        "shop",
        "aboutUs",
        "contactUs",
        "blog",
        "products",
        "orders",
      ].includes(redirect)
    ) {
      setActive(redirect);
    }
  }, [redirect]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <TopBar active={active} setActive={setActive} />
        <main className="main">
          <div className="content">
            <Route
              path="/orders"
              component={() => <OrdersScreen setActive={setActive} />}
            />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route
              path="/signin"
              component={() => <SigninScreen setActive={setActive} />}
            />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route
              path="/shop"
              component={() => <HomeScreen setActive={setActive} />}
            />
            <Route
              path="/home"
              exact={true}
              component={() => <Home setNav={setActive} />}
            />
            <Route
              path="/"
              exact={true}
              component={() => <Home setAct={setActive} />}
            />
            <Route path="/aboutUs" component={AboutUs} />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/like" component={FavorScreen} />
            <Route path="/articles" component={ArticlesScreen} />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
