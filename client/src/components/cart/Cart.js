import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../store/cartSlice/cartReducers";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../store/cartSlice/cartSlice";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart({ id: id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart({ id: id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };
  let totalAmount = 0;

  items.forEach(item => {
    if (item.price && item.price > 0){
      totalAmount += item.price * item.quantity;
    }else {
      totalAmount += item.originalPrice * item.quantity;
    }
  });


  return (
    <Fragment>
      <MetaData title={"CART -- ECOMMERCE"} />
      {items.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {items &&
              items.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {
                    item.price && item.price > 0 ? (
                      <p className="cartSubtotal">{`Rs. ${
                        item.price * item.quantity
                      }`}</p>
                    ) : (
                      <p className="cartSubtotal">{`Rs. ${
                        item.originalPrice * item.quantity
                      }`}</p>
                    )
                  }
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Total Amount</p>
                {totalAmount}
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
