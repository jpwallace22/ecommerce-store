import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

function CartScreen() {
  const dispatch = useDispatch();

  return <div>CART</div>;
}

export default CartScreen;
