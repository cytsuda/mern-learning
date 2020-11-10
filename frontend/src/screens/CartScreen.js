import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  Image,
  Form,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <Row className="my-3">
      <Col md={8}>
        <h1 className="mb-4">Shopping Cart</h1>
        <hr />
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty,
            <Link className="font-weight-bold ml-1" to="/">
              click here to go back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <hr />
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title as="h2">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </Card.Title>
            <Card.Subtitle as="h5">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </Card.Subtitle>
          </Card.Body>
          <Card.Footer>
            <Button
              size="lg"
              className="btn-block"
              disabled={cartItems.lenght === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
