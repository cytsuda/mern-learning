import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  // Calculate Prices
  const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(cartItems > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number(0.15 * itemsPrice).toFixed(2));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)
  );

  // F
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        // user: req.user._id,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="mt-3">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">Cart is empty</Message>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th className="col-md-1 text-center" scope="col">
                        #
                      </th>
                      <th className="col-md-4" scope="col">
                        Item
                      </th>
                      <th className="col-md-1" scope="col">
                        Price
                      </th>
                      <th className="col-md-1" scope="col">
                        Qty
                      </th>
                      <th className="col-md-1" scope="col">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.product}>
                        <td className="align-middle">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </td>
                        <td className="align-middle">{item.name}</td>
                        <td className="align-middle">{item.price}</td>
                        <td className="align-middle">{item.qty}</td>
                        <td className="align-middle">
                          {item.price * item.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card variant="flush" border="light">
            <Card.Header>
              <Card.Title as="h2" className="mb-1">
                Place Order
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Table>
                <tbody>
                  <tr>
                    <td>All Items</td>
                    <td className="text-right">${itemsPrice}</td>
                  </tr>
                  <tr>
                    <td>Shipping Price</td>
                    <td className="text-right">${shippingPrice}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td className="text-right">${taxPrice}</td>
                  </tr>
                  <tr className="active">
                    <td className="font-weight-bold">Total</td>
                    <td className="text-right font-weight-bold">
                      ${totalPrice}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {error && <Message variant="danger">{error}</Message>}
              <Button
                className="btn-block font-weight-bold"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
