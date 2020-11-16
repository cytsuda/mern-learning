import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  console.log(orderDetails);
  const { loading, error, order } = orderDetails;
  // Calculate Prices
  const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2);
  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    // eslint-disable-next-line
  }, [dispatch, orderId]);

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
                    <strong>Email: </strong>{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                    <br />
                    <strong>Address:</strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
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
