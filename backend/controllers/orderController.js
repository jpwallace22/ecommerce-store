import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private(protected)
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  //return the new order if 201, throw error if not
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc    Get order by id
 * @route   GET /api/orders/:id
 * @access  Private(protected)
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  //return the order if its available, or throw error if not
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc    update order to 'paid'
 * @route   PUT /api/orders/:id/pay
 * @access  Private (protected)
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  //return the order if its available, or throw error if not
  console.log(req.body); //? this shoes the body (as expected)
  console.log(req.body.payer); //? this shows undefined
  // console.log(req.body.payer.email_address) //? this will throw a 500
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      // email_address: req.body.payer.email_address, //! cant read the email address from the body. Still trying to figure out why.
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
