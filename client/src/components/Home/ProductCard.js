import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product && product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      {product?.price > 0 ? (
        <>
          <span>{`Rs.${product?.price}`}</span>
          <span
            style={{
              color: "#878787",
              fontSize: 9,
              textDecoration: "line-through",
            }}
          >
            Rs.{product?.originalPrice}
          </span>
        </>) : (
          <span>{`Rs.${product?.originalPrice}`}</span>
        )
      }
    </Link>
  );
};

export default ProductCard;
