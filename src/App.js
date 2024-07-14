import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blogs from "./pages/Blogs";
import CompareProducts from "./pages/CompareProducts";
import SingleBlog from "./pages/SingleBlog";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import PaymentSuccess from "./components/PaymentSuccess";
import {PrivateRoutes} from "./routing/PrivateRoutes";
import {OpenRoutes} from "./routing/OpenRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path="my-orders" element={<PrivateRoutes><Orders /></PrivateRoutes>} />
            <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path="product" element={<OurStore />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="compare-products" element={<CompareProducts />} />
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="checkout-success" element={<OpenRoutes><PaymentSuccess successMessage="Your payment was successful!" /></OpenRoutes>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
