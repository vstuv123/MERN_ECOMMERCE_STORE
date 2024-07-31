import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProductReset,
} from "../../store/adminSlice/adminSlice";
import { updateProduct } from "../../store/adminSlice/adminReducers";
import { getProductDetails } from "../../store/productSlices/productReducers";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DiscountIcon from "@mui/icons-material/Discount";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.admin);
  const { error, product } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (product === null) {
      dispatch(getProductDetails(id));
    }
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setOriginalPrice(product?.originalPrice || 0);
      setCategory(product?.category);
      setStock(product?.stock);
      setOldImages(product?.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch(updateProductReset());
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, updateError, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const validPrice = price !== null && price !== undefined ? price : 0;

    const sellingPrice = validPrice === 0 ? originalPrice : validPrice;
    dispatch(
      updateProduct({
        id,
        name,
        description,
        price: validPrice,
        originalPrice,
        sellingPrice,
        category,
        stock: Stock,
        images,
      })
    );
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setOldImages([]);
    const newImages = [];
    const newImagesPreview = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          newImagesPreview.push(reader.result);
          newImages.push(reader.result);

          // If all files are read, update the state
          if (newImages.length === files.length) {
            setImagesPreview((prevImages) => [
              ...prevImages,
              ...newImagesPreview,
            ]);
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Edit Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Original Price"
                value={originalPrice}
                required
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div>
              <DiscountIcon />
              <input
                type="number"
                placeholder="Discounted Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview &&
                imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="New Product Preview" />
                ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Edit
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
