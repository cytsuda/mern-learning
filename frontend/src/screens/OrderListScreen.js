import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listOrders());
    }
  }, [userInfo, dispatch, history]);
  return (
    <>
      <Row className="my-3 align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table
            variant="light"
            stripped
            bordered
            hover
            responsive
            className="table-sm"
          >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th className="text-right">TOTAL</th>
                <th className="text-center">BUYED AT</th>
                <th className="text-center">PAID AT</th>
                <th className="text-center">IS DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td className="text-right">R${order.totalPrice}</td>
                  <td className="text-center">
                    {order.createdAt ? (
                      order.createdAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="info" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </>
  );
};

export default OrderListScreen;
