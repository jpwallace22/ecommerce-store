import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  // will catch users logged in in and send them wherever needed (shipping)
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
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
        <Button
          type="submit"
          variant="primary"
          disabled={!name || !email || !password || !confirmPassword}
        >
          Sign Up
        </Button>
      </Form>
      <Row className="py-3">
        <Col className="ms-1">
          Have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">Passwords do not match</Message>}
      {loading && <Loader />}
    </FormContainer>
  );
}

export default RegisterScreen;
