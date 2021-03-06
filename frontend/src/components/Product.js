import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import MyRating from "./MyRating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text className="mb-3 mt-auto d-flex" as="div">
          <MyRating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3" className="text-right">
          <span className="h5 mr-1">$</span>
          <span className="font-weight-bold">{parseFloat(product.price).toFixed(2)}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
