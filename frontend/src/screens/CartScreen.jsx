import { useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = params.id;
  // const qty = location.search ?
  console.log(location.search);

  return <div>CART</div>;
}

export default CartScreen;
