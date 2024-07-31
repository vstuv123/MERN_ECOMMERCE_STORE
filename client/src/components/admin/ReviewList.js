import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ReviewList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import StarIcon from "@mui/icons-material/Star";
import Delete from "@mui/icons-material/Delete";
import {
  clearErrors,
  deleteReviewReset,
} from "../../store/adminSlice/adminSlice";
import {
  getAllReviews,
  deleteReviewAdmin,
} from "../../store/adminSlice/adminReducers";

const ReviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, reviews, loading } = useSelector((state) => state.admin);
  const [productId, setProductId] = useState("");

  const { error: deleteError, isDeletedReview } = useSelector(
    (state) => state.admin
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviewAdmin({ reviewId, productId }));
  };

  const productReviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeletedReview) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch(deleteReviewReset());
      dispatch(getAllReviews(productId));
    }

  }, [dispatch, alert, error, deleteError, navigate, isDeletedReview, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 220, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        const rating = params.row.role;
        return rating >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = reviews?.map((item) => ({
    id: item._id,
    comment: item.comment,
    user: item.name,
    rating: item.rating,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewSubmitHandler}
          >
            <h1>All Reviews</h1>

            <div>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewList;
