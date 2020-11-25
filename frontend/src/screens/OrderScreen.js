// <script src="https://paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkready] = useState(false);
  const [btnDeliver, setBtnDeliver] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Prices
  const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2);
  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkready(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(orderId));
      setBtnDeliver(false);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkready(true);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, orderId, successPay, order, successDeliver, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const deliveredHandler = () => {
    setBtnDeliver(true);
    dispatch(deliverOrder(order));
  };
  return (
    <>
      {loading ? (
        <Row className="my-3">
          <Col md={12}>
            <Loader />
          </Col>
        </Row>
      ) : error ? (
        <Row className="my-3">
          <Col md={12}>
            <Message variant="danger">{error}</Message>
          </Col>
        </Row>
      ) : (
        <>
          <Row className="mt-3">
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1 className="text-uppercase">
                    <strong>Order: </strong>
                    {orderId}
                  </h1>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <hr className="my-0" />
          <Row className="mt-0">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p className="mb-3">
                    <strong>Name: </strong> {order.user.name}
                    <br />
                    <strong>Email: </strong> &nbsp;
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                    <br />
                    <strong>Address:</strong> {order.shippingAddress.address},
                    &nbsp;
                    {order.shippingAddress.city}, &nbsp;
                    {order.shippingAddress.postalCode}, &nbsp;
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment</h2>
                  <p className="mb-3">
                    <strong>Method: </strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
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
                        {order.orderItems.map((item) => (
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
                        <td className="text-right">${order.itemsPrice}</td>
                      </tr>
                      <tr>
                        <td>Shipping Price</td>
                        <td className="text-right">${order.shippingPrice}</td>
                      </tr>
                      <tr>
                        <td>Tax</td>
                        <td className="text-right">${order.taxPrice}</td>
                      </tr>
                      <tr className="active">
                        <td className="font-weight-bold">Total</td>
                        <td className="text-right font-weight-bold">
                          ${order.totalPrice}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <ListGroup variant="flush">
                    {userInfo && !userInfo.isAdmin && (
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            currency="BRL"
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <ListGroup.Item>
                        {loadingDeliver ? (
                          <Loader />
                        ) : (
                          <Button
                            className="btn-block btn-large"
                            variant="info"
                            onClick={deliveredHandler}
                            disabled={order.isDelivered}
                          >
                            {btnDeliver ? (
                              <Loader variant="sm" />
                            ) : order.isDelivered ? (
                              "DELIVERED"
                            ) : (
                              "DELIVER"
                            )}
                          </Button>
                        )}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                  {error && <Message variant="danger">{error}</Message>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
