import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { usersList, userDelete } from "../actions/userActions";

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, redirect } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDeleted = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDeleted;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(usersList());
    } else {
      if (redirect) {
        history.push("/");
      }
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")){
      dispatch(userDelete(id));
    };
  };

  return (
    <>
      <h1 className="my-3">Users</h1>
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
              <th>EMAIL</th>
              <th className="text-center">ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <i className="text-success fas fa-check" />
                  ) : (
                    <i className="text-danger fas fa-times" />
                  )}
                </td>
                <td className="text-center">
                  <LinkContainer to={`/user/${user._id}`}>
                    <Button variant="info" className="btn-sm mr-4">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
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

export default UsersListScreen;
