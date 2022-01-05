import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

function ProductScreen() {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    //   swal({
    //     title: "Good Choice!",
    //     text: "Would you like to proceed to the cart?",
    //     buttons: ["Continue Shopping", "Proceed to Cart"],
    //   }).then((proceed) => {
    //     if (proceed) {
    //       navigate(`/cart`);
    //     }
    //   });
    //   dispatch(addToCart(product._id, qty));
    // };
    swal({
      title: "Good Choice!",
      text: "Would you like to proceed to the cart?",
      buttons: {
        cancel: "Continue Shopping",
        confirm: {
          text: "Proceed to Cart",
          value: "proceed",
        },
      },
    }).then((value) => {
      switch (value) {
        case "proceed":
          dispatch(addToCart(product._id, qty));
          navigate(`/cart`);
          break;
        default:
          dispatch(addToCart(product._id, qty));
          navigate(`/`);
      }
    });
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {Object.keys(product).length === 0 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5} lg={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4} lg={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={({ target }) =>
                            setQty(Number(target.value))
                          }
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    style={{ width: "100%" }}
                    disabled={!product.countInStock}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;
