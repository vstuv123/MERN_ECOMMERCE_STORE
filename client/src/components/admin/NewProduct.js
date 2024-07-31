import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProductReset } from "../../store/adminSlice/adminSlice";
import { createProduct } from "../../store/adminSlice/adminReducers";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from '@mui/icons-material/Discount';
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, isCreated } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
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
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isCreated) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch(createProductReset());
    }
  }, [dispatch, alert, error, navigate, isCreated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("originalPrice", originalPrice);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", Stock);
    const sellingPrice = (price === null || price === 0 || price === undefined) ? originalPrice : price;
    myForm.append("sellingPrice", sellingPrice);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
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
            setImagesPreview((prevImages) => [...prevImages, ...newImagesPreview]);
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        }
      };
  
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
                required
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div>
              <DiscountIcon />
              <input
                type="number"
                placeholder="Discounted Price"
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
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
