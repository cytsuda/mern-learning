import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text className="mb-3 mt-auto d-flex" as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3" className="text-right">
          <span className="h5 mr-1">$</span>
          <span className="font-weight-bold">{product.price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
