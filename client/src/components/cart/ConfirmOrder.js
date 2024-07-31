import React, { Fragment } from "react";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const { shippingInfo, items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const subtotal = items?.reduce(
    (acc, item) => acc + item.quantity * item.originalPrice,
    0
  );

  const discount = items.reduce(
    (acc, item) => acc + (item.price > 0 ? (item.originalPrice - item.price) * item.quantity : 0),
    0
  );

  const total = subtotal - discount;

  const shippingCharges = total >= 1999 ? 0 : 200;

  const totalPrice = total + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      discount,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {items &&
                items.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{" "}
                      {item.price > 0 ? item.price : item.originalPrice} ={" "}
                      <b>
                        Rs.{" "}
                        {item.price > 0
                          ? item.price
                          : item.originalPrice * item.quantity}
                      </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs. {shippingCharges}</span>
              </div>
              <div>
                <p>Discount</p>
                <span>Rs. {discount}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs. {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
