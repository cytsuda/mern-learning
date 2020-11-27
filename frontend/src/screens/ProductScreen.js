import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";

import MyRating from "../components/MyRating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Reviews from "../components/Reviews";

import { detailProduct, createReviewProduct } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: reviewError,
    loading: reviewLoading,
    success: reviewSuccess,
  } = productReviewCreate;

  useEffect(() => {
    if (reviewSuccess || !product._id || product._id !== match.params.id) {
      reviewSubmitLoading && setReviewSubmitLoading(false);
      setRating(0);
      setComment("");
      dispatch(detailProduct(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, reviewSuccess, product, reviewSubmitLoading, userInfo]);

  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitReviewHandler = (e, review) => {
    e.preventDefault();
    setReviewSubmitLoading(true);
    dispatch(createReviewProduct(product._id, { rating, comment }));
  };
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
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} fluid />
            </Col>
            <Col md={3}>
              <Card className="h-100">
                <Card.Header>
                  <Card.Title as="h5">{product.name}</Card.Title>
                  <Card.Subtitle className="d-flex justify-content-between">
                    <MyRating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className={clsx(
                      "btn-block",
                      product.countInStock === 0
                        ? "btn-secondary"
                        : "btn-primary"
                    )}
                    disabled={product.countInStock === 0}
                    onClick={submitHandler}
                  >
                    {product.countInStock > 0 ? "Add to cart" : "Out of Stock"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <h3>Reviews</h3>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col md={6}>
              <Reviews
                loadingReviews={reviewLoading}
                onSubmit={submitReviewHandler}
                user={userInfo ? userInfo : null}
                product={product}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
