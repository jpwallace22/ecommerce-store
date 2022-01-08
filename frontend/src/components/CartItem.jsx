import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import swal from "sweetalert";
import {
  Col,
  ListGroup,
  Row,
  Image,
  FormControl,
  Button,
} from "react-bootstrap";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const addToCartHandler = ({ target }) => {
    dispatch(addToCart(item._id, Number(target.value)));
  };

  const removeFromCartHandler = () => {
    swal({
      text: `Do you wish to remove the ${item.name} from your cart?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeFromCart(item._id));
      }
    });
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col className="me-3" md={2}>
          ${(item.price * item.qty).toFixed(2)}
        </Col>
        <Col md={2}>
          <FormControl as="select" value={item.qty} onChange={addToCartHandler}>
            {/* loop the amount in stock and create a selection to change quantity */}
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </FormControl>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={removeFromCartHandler}>
            <i className="fas fa-trash md:ms-3"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
