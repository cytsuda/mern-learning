import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = (props) => {
  let variantStyle = {
    width: "100px",
    height: "100px",
  };
  if (props.variant === "sm") {
    variantStyle = {
      height: "35px",
      width: "35px",
    };
  }
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        ...variantStyle,
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
Loader.defaultProps = {
  variant: false,
};
export default Loader;
