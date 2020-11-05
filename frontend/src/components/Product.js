import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body className="d-flex flex-column">
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text className="mb-3 mt-auto d-flex" as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3" className="text-right">
          <span className="font-italic h5 mr-1">$</span>
          <span className="font-italic font-weight-bold">{product.price}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
