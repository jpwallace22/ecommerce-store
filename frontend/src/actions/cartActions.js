import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

//pull item from database, if its in stock, add to the cart and set in localStorage
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  if (data.countInStock > 0) {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: data._id,
        name: data.name,
        image: data.image,
        countInStock: data.countInStock,
        price: data.price,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } else {
    return;
  }
};

//remove from cart and local storage
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//set to cart and local storage
export const saveShippingAddress = (formData) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: formData });
  localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

//set to cart and local storage
export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};
