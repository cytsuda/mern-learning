import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <hr className="primary" />
      <Container>
        <p className="text-center">
          <small>Copyright &copy; NoobShop - 2020</small>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
