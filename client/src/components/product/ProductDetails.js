import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  createProductReviews,
  getProductDetails,
} from "../../store/productSlices/productReducers";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../store/cartSlice/cartReducers";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import {
  clearErrors,
  newReviewReset,
} from "../../store/productSlices/productSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { product, isReviewed, loading, error } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const increaseQuantity = () => {
    if (product?.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const productCartHandler = () => {
    dispatch(addItemsToCart({ id: id, quantity: quantity }));
    alert.success("Item added to Cart");
  };

  const submitReview = () => {
    const myForm = new FormData();

    myForm.append("rating", rating);
    myForm.append("comment", comment);
    myForm.append("productId", product?._id);

    dispatch(createProductReviews(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (isReviewed) {
      alert.success("Review submitted successfully");
    }
    dispatch(newReviewReset());

    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, isReviewed]);

  const options = {
    size: "large",
    value: product && product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product?.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product &&
                  product.images &&
                  product.images.map((img, i) => (
                    <img
                      className="CarouselImage"
                      key={img.url}
                      src={img.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product && product.name}</h2>
                <p>Product # {product && product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product && product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <div className="price"
                >
                  <h1>
                    Rs{" "}
                    {product && product.price > 0
                      ? product.price
                      : product && product.originalPrice}
                  </h1>
                  {(product && product.price) > 0 && (
                    <p
                      style={{
                        color: "#878787",
                        fontSize: 15,
                        textDecoration: "line-through",
                        marginLeft: 4,
                      }}
                    >
                      Rs.{product && product.originalPrice}
                    </p>
                  )}
                </div>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button
                    disabled={product?.stock < 1 ? true : false}
                    onClick={productCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b
                    className={
                      product && product.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {product && product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product && product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={submitReview} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product && product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
