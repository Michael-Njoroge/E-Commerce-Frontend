import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
  <>
  <Header/>
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      theme="dark"
      pauseOnHover
    />
  <Outlet/>
  <Footer/>
  </>
  )
};

export default Layout;
