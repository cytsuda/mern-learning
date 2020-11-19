import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { listProducts, deleteProduct } from "../actions/productActions";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
      // ADD DELETE DISPATCH
    }
  };
  const createProductHandler = () => {};
  return (
    <>
      <Row className="my-3 align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="font-weight-bold text-uppercase"
            variant="outline-primary"
            size="lg"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus" /> &nbsp; Create new product
          </Button>
        </Col>
      </Row>
      <hr />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          variant="light"
          striped
          bordered
          hover
          responsive
          className="table-sm"
        >
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th className="text-center">PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td className="text-center">${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className="text-center">
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="info" className="btn-sm mr-3">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
