import React, { useEffect } from 'react'
import { Rating } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteReviewUser, getProductDetails } from '../../store/productSlices/productReducers';
import { useAlert } from 'react-alert';
import { clearErrors, deleteReviewReset } from '../../store/productSlices/productSlice';

const ReviewCard = ({ review }) => {
  const { user } = useSelector(state => state.auth);
  const { error, isDeletedReview } = useSelector(state => state.products);
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = {
    value: review && review.rating,
    readOnly: true,
    precision: 0.5
  };

  const handleDeleteReview = () => {
    if (review._id) {
      dispatch(deleteReviewUser({ reviewId: review._id, productId: id }));
    } else {
      console.error("Review ID is not defined");
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeletedReview) {
      alert.success("Review deleted successfully");
      dispatch(deleteReviewReset());
      dispatch(getProductDetails(id));
    }
  }, [alert, dispatch, error, isDeletedReview, id, navigate])

  return (
    <div className='reviewCard'>
      <Delete onClick={handleDeleteReview} style={{ position: "relative", top: '-2.5vmax', left: '16vmax', color: 'red'}} />
      <img src={user?.avatar.url} alt='User'/>
      <p>{review?.name}</p>
      <Rating {...options} />
      <span className='reviewCardComment'>{review?.comment}</span>
    </div>
  )
}

export default ReviewCard
