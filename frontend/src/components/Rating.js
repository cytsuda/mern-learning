import React from "react";

const Rating = ({ value, text, color }) => {
  let stars = [];
  for (let cont = 1; cont <= 5; cont++) {
    if (value - cont >= 0) {
      // add 1 estrela
      stars.push(
        <i key={cont - 1} style={{ color }} className="fas fa-star" />
      );
    } else if (value - cont > -1) {
      stars.push(
        <i key={cont - 1} style={{ color }} className="fas fa-star-half-alt" />
      );
    } else {
      stars.push(
        <i key={cont - 1} style={{ color }} className="far fa-star" />
      );
    }
  }
  return (
    <>
      <span>{stars}</span>
      <span className="ml-auto">{text}</span>
    </>
  );
};

Rating.defaultProps = {
  color: "#efa31d",
};

export default Rating;
