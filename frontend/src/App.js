import React from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
