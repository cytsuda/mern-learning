import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, ListGroup } from "react-bootstrap";

import Loader from "./Loader";
import MyRating from "./MyRating";
// /login?redirect=shipping

const Reviews = ({ loadingReviews, onSubmit, user, product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { reviews, _id } = product;
  const linkLogin = {
    className: "text-dark",
    to: `/login?redirect=products/${_id}`,
  };
  const verifyUser = () => {
    if (user) {
      const foundId = reviews.find((r) => r.user === user._id);
      if (foundId) {
        return foundId;
      }
    }
    return false;
  };

  return (
    <ListGroup>
      {reviews.length === 0 ? (
        <ListGroup.Item variant="warning">
          <h6 className="font-weight-bold mb-0 py-2">
            No reviews available.&nbsp;
            {!user && (
              <Link {...linkLogin}>Log in now and be the first to review</Link>
            )}
          </h6>
        </ListGroup.Item>
      ) : (
        reviews.map((item) => (
          <ListGroup.Item
            key={item._id}
            variant={verifyUser().user === item.user && "success"}
          >
            <div className="d-flex">
              <span className="font-weight-bold my-0  mr-auto">
                {item.name}
              </span>
              <p className="my-0">
                <i>{item.createdAt.substring(0, 10)}</i>
              </p>
            </div>
            <MyRating value={item.rating} />
            <p>
              <strong>Comment:&nbsp;</strong>
              {item.comment}
            </p>
          </ListGroup.Item>
        ))
      )}
      {!user ? (
        reviews.length === 0 ? null : (
          <ListGroup.Item variant="warning">
            <h6 className="font-weight-bold mb-0 py-2">
              You are not logged.&nbsp;
              {!user && <Link {...linkLogin}>Please click here to log in</Link>}
            </h6>
          </ListGroup.Item>
        )
      ) : !verifyUser() ? (
        <ListGroup.Item>
          <Form onSubmit={(e) => onSubmit(e, { rating, comment })}>
            <h4 className={loadingReviews && "pb-4"}>Write a product review</h4>
            {loadingReviews ? (
              <Loader />
            ) : (
              <>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    disabled={loadingReviews}
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
                  />
                </Form.Group>
                <Button type="submit" variant="primary" size="lg" block>
                  Send review
                </Button>
              </>
            )}
          </Form>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item variant="success">
          <h6 className="font-weight-bold">You already review this product.</h6>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Reviews;
// O form some então nao precisa dar disable nos item
/*


*/
