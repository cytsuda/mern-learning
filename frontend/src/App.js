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
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userslist" component={UsersListScreen} />

          <Route
            path="/admin/productslist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productslist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/products/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/admin/orderslist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
