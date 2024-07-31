import React, { useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getAllProducts } from "../../store/productSlices/productReducers";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import { clearErrors } from "../../store/productSlices/productSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();
  const query = useQuery();
  const keyword = query.get("keyword");
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  let count = filteredProductsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts({ keyword, currentPage, price, category, rating }));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const handleRating = (event, newRating) => {
    setRating(newRating);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          {products && products.length > 0 ? (
            <>
              <div className="products">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  area-labelledby="range slider"
                  min={0}
                  max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories &&
                    categories.map((category) => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </li>
                    ))}
                </ul>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={rating}
                    onChange={handleRating}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>

              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </>
          ) : (
            <p className="no-items">No items match your search text</p>
          )}
        </>
      )}
    </>
  );
};

export default Products;
