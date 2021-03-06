import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Link className="link-unstyled" to={`/product/${product._id}`}>
      <Card className="my-3 p-3 rounded">
        <Card.Img src={product.image} variant="top" />

        <Card.Body>
          <Card.Title as="h6">
            {" "}
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
