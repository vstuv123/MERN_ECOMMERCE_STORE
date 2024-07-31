import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Loader from "./components/layout/Loader/Loader.js";

import Home from "./components/Home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignup from "./components/Auth/LoginSignup.js";
import { store } from "./store/store";
import { loadUser } from "./store/authSlice/authReducers.js";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.js";
import UserProfile from "./components/Auth/UserProfile.js";
import ProtectedRoute from "./route/ProtectedRoute.js";
import UpdateProfile from "./components/Auth/UpdateProfile.js";
import UpdatePassword from "./components/Auth/UpdatePassword.js";
import ForgotPassword from "./components/Auth/ForgotPassword.js";
import ResetPassword from "./components/Auth/ResetPassword.js";
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import axios from "axios";
import PaymentForm from "./components/cart/PaymentForm.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/admin/Dashboard.js";
import ProductList from "./components/admin/ProductList.js";
import NewProduct from "./components/admin/NewProduct.js";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import UpdateOrder from "./components/admin/UpdateOrder.js";
import UserList from "./components/admin/UserList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ReviewList from "./components/admin/ReviewList.js";
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';
import NotFound from './components/layout/NotFound/NotFound';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<UserProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatePassword />} />
                <Route path="/order/confirm" element={<ConfirmOrder />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard />} />
                <Route isAdmin={true} path="/admin/products" element={<ProductList />} />
                <Route isAdmin={true} path="/admin/product" element={<NewProduct />} />
                <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct />} />
                <Route isAdmin={true} path="/admin/orders" element={<OrderList />} />
                <Route isAdmin={true} path="/admin/order/:id" element={<UpdateOrder />} />
                <Route isAdmin={true} path="/admin/users" element={<UserList />} />
                <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser />} />
                <Route isAdmin={true} path="/admin/reviews" element={<ReviewList />} />
                {stripeApiKey && (
                  <Route
                    path="/process/payment"
                    element={
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <PaymentForm />
                      </Elements>
                    }
                  />
                )}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Suspense>
        </>
      )}
    </Router>
  );
}

export default App;
