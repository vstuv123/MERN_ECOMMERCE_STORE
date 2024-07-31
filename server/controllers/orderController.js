const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Create new Order
exports.createNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    discountPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    discountPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(201).json({ success: true, order });

});

// get single order (admin)
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({ success: true, order });
})

// get logged in user order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({ success: true, orders });
})

// get all orders (admin)
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({ success: true, totalAmount, orders });
})

// update order status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found at this id", 404))
    }

    if (order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.orderStatus === "Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        })
    }

    order.orderStatus = req.body.orderStatus;
    if (req.body.orderStatus === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// delete Order (admin)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found at this id", 404))
    }

    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true });
})