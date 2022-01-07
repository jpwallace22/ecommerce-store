import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    } else {
      if (!user.name) {
        console.log("get user deets");
        dispatch(getUserDetails("profile"));
      } else {
        console.log("Else Statment");
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      // TODO dispatch update profile
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="ms-1">Name</Form.Label>
            <Form.Control
              className="mb-3"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className="ms-1">Email Address</Form.Label>
            <Form.Control
              className="mb-3"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="ms-1">Password</Form.Label>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm-password">
            <Form.Label className="ms-1">Confirm Password</Form.Label>
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Info
          </Button>
        </Form>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">Passwords do not match</Message>}
        {loading && <Loader />}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
