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

import { detailProduct, createReviewProduct } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const [reviewed, setReviewed] = useState(false);
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
    if (!userInfo) {
      history.push("/login");
    }
    if (reviewSuccess || !product._id || product._id !== match.params.id) {
      reviewSubmitLoading && setReviewSubmitLoading(false);
      setReviewed(false);
      setRating(0);
      setComment("");
      dispatch(detailProduct(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (
      !reviewed &&
      product.reviews.find((r) => r.user === userInfo._id) &&
      product.reviews.length > 0
    ) {
      setReviewed(true);
    }
  }, [
    dispatch,
    match,
    reviewSuccess,
    product,
    reviewSubmitLoading,
    reviewed,
    userInfo,
  ]);

  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
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
              {reviewLoading && <Loader />}
              <ListGroup>
                {product.reviews.length === 0 ? (
                  <ListGroup.Item variant="info">
                    <h5 className="font-weight-bold mb-0 py-2">
                      No reviews yet. &nbsp;
                      {!userInfo && (
                        <Link
                          className="font-weight-bold text-dark"
                          to="/login"
                        >
                          Login now and be the first to review
                        </Link>
                      )}
                    </h5>
                  </ListGroup.Item>
                ) : (
                  <>
                    {product.reviews.map((review) => (
                      <ListGroup.Item
                        key={review._id}
                        variant={
                          review.user === userInfo._id ? "primary" : null
                        }
                      >
                        <div className="d-flex">
                          <span className="font-weight-bold my-0  mr-auto">
                            {review.name}
                          </span>
                          <p className="my-0">
                            <i>{review.createdAt.substring(0, 10)}</i>
                          </p>
                        </div>
                        <MyRating value={review.rating} />
                        <p>
                          <strong>Comment:&nbsp;</strong>
                          {review.comment}
                        </p>
                      </ListGroup.Item>
                    ))}
                  </>
                )}
                {reviewError ? (
                  <ListGroup.Item variant="danger">
                    <h5 className="font-weight-bold mb-0 py-2">
                      {reviewError}
                    </h5>
                  </ListGroup.Item>
                ) : userInfo ? (
                  reviewed ? (
                    <ListGroup.Item variant="primary">
                      <h6 className="font-weight-bold mb-0 py-2">
                        You already reviewed this product, thanks.
                      </h6>
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item>
                      <Form onSubmit={submitReviewHandler}>
                        <h4>Write a product review</h4>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            disabled={reviewSubmitLoading}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excelent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Comment:</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={reviewSubmitLoading}
                          />
                        </Form.Group>
                        <Button type="submit" variant="primary" size="lg" block>
                          {reviewSubmitLoading ? (
                            <Loader variant="sm" />
                          ) : (
                            "Send Review"
                          )}
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  )
                ) : (
                  product.reviews.length > 0 && (
                    <Message variant="danger">
                      <span className="font-weight-bold">
                        You need to be logged to review this product.&nbsp;
                        <Link className="text-dark" to="/login">
                          You can login here
                        </Link>
                      </span>
                    </Message>
                  )
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
