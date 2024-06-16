import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import watch from "../images/watch.jpg"
import {AiFillDelete} from "react-icons/ai"

const Cart = () => {
  return (
    <>
      <Meta title="E-Commerce | Cart" />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex align-items-center justify-content-between">
              	<h4 className="cart-col-1">Product</h4>
              	<h4 className="cart-col-2">Price</h4>
              	<h4 className="cart-col-3">Quantity</h4>
              	<h4 className="cart-col-4">Total</h4>
              </div>
               <div className="cart-data mb-2 py-3 d-flex align-items-center justify-content-between">
              	<div className="cart-col-1 gap-15 d-flex align-items-center">
              		<div className="w-25">
              			<img src={watch} className="img-fluid" alt="product image"/>
              		</div>
              		<div className="w-75">
              			<h5 className="title">sfdwfds</h5>
              			<p className="color">sfdwfds</p>
              			<p className="size">sfdwfds</p>
              		</div>
              	</div>
              	<div className="cart-col-2">
              		<h5 className="price">$ 100</h5>
              	</div>
              	<div className="cart-col-3 d-flex align-items-center gap-15">
              		<div>
              			<input type="number" className="form-control" name="" id="" min={1} max={10} />
              		</div>
              		<div>
              			<AiFillDelete/>
              		</div>
              	</div>
              	<div className="cart-col-4">
              		<h5 className="price">$ 100</h5>
              	</div>
              </div>
              <div className="cart-data mb-2 py-3 d-flex align-items-center justify-content-between">
              	<div className="cart-col-1 gap-15 d-flex align-items-center">
              		<div className="w-25">
              			<img src={watch} className="img-fluid" alt="product image"/>
              		</div>
              		<div className="w-75">
              			<h5 className="title">sfdwfds</h5>
              			<p className="color">sfdwfds</p>
              			<p className="size">sfdwfds</p>
              		</div>
              	</div>
              	<div className="cart-col-2">
              		<h5 className="price">$ 100</h5>
              	</div>
              	<div className="cart-col-3 d-flex align-items-center gap-15">
              		<div>
              			<input type="number" className="form-control" name="" id="" min={1} max={10} />
              		</div>
              		<div>
              			<AiFillDelete/>
              		</div>
              	</div>
              	<div className="cart-col-4">
              		<h5 className="price">$ 100</h5>
              	</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
