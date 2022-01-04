import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import CartItem from "../components/CartItem";
import { Col, ListGroup, Row, Button, Card } from "react-bootstrap";

function CartScreen() {
  const navigate = useNavigate();

  // pull cartItems out of global state
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  return (
    <Row className="cart">
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty &nbsp; |&nbsp;{" "}
            <Link className="link-unstyled" to="/">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {/* subtotal is created from reducing qty for all items */}
                Subtotal ({cartItems.reduce((a, item) => a + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                style={{ width: "100%" }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
