import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getAllProducts } from "../../store/productSlices/productReducers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../store/productSlices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
