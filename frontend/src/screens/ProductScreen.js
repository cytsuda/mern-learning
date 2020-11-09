import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Image, Card, ListGroup, Button } from "react-bootstrap";

import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { detailProduct } from "../actions/productActions";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  useEffect(() => {
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-outline-primary my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={3}>
            <Card className="h-100">
              <Card.Header>
                <Card.Title as="h5">{product.name}</Card.Title>
                <Card.Subtitle>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    sep="ml-2"
                  />
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Title className="d-flex align-items-baseline">
                  <span className="mr-auto font-weight-bold">Price:</span>
                  <span className="mr-1">$</span>
                  <span className="font-weight-bold h3">{product.price}</span>
                </Card.Title>
                <Card.Text>
                  <span className="font-weight-bold mr-1">Description:</span>
                  <span>{product.description}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
