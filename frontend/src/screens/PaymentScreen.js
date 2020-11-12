import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="pt-3">Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or credit card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
