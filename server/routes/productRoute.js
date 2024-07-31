const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReviews,
  getReviewsOfSingleProduct,
  deleteReviewOfSingleProduct,
  getAllAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllAdminProducts);

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser, createProductReviews);
router
  .route("/reviews")
  .get(isAuthenticatedUser, getReviewsOfSingleProduct)
  .delete(
    isAuthenticatedUser,
    deleteReviewOfSingleProduct
  );

module.exports = router;
