import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCountry(shippingAddress.country);
      setPostalCode(shippingAddress.postalCode);
      setCity(shippingAddress.city);
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label className="ms-1">Address</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={({ target }) => setAddress(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="ms-1">City</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={({ target }) => setCity(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label className="ms-1">Postal Code</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={({ target }) => setPostalCode(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label className="ms-1">Country</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Enter Country"
            value={country}
            required
            onChange={({ target }) => setCountry(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
