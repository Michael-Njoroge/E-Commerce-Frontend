import React from "react";
import {Link} from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg"

const Checkout = () => {
  return (
    <>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Dev Corner</h3>
                <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/cart" className="text-dark total-price">Cart</Link>&nbsp;/</li>
                    <li className="breadcrumb-item total-price active" aria-current="page">Information &nbsp;/</li>
                    <li className="breadcrumb-item total-price active" aria-current="page">Shipping &nbsp;/</li>
                    <li className="breadcrumb-item active" aria-current="page">Payment</li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">Michael Njoroge(mikethecoder12@gmail.com)</p>
                <h5 className="mb-3">Shipping Address</h5>
                <form action="" className="d-flex flex-wrap justify-content-between gap-15">
                  <div className="w-100">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>Select Country</option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text" placeholder = "First Name(optional)" className="form-control" name="" id=""/>
                  </div>
                   <div className="flex-grow-1">
                    <input type="text" placeholder="Last Name" className="form-control" name="" id=""/>
                  </div>
                  <div className="w-100">
                    <input type="text" placeholder="Address" className="form-control" name="" id=""/>
                  </div>
                   <div className="w-100">
                    <input type="text" placeholder="Apartment, Suite, etc. (optional)" className="form-control" name="" id=""/>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text" placeholder="City" className="form-control" name="" id=""/>
                  </div>
                  <div className="flex-grow-1">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>Select State</option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text" placeholder="Zipcode" className="form-control" name="" id=""/>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="fs-5 me-2"/>
                        Return to Cart
                      </Link>
                      <Link to="/shipping" className="button">Continue to Shipping</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
              <div className="d-flex mb-2 align-items-center gap-10">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                  <span style={{top:"-10px", right:"2px"}} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">1</span>
                    <img className="img-fluid" src={watch} alt="checkout" />
                  </div>
                  <div>
                    <h5 className="total-price">mfsdfds</h5>
                    <p className="total-price">s / #sdfsd</p>
                  </div>
                </div>
                
                <div className="flex-grow-1">
                  <h5 className="total">$ 100</h5>
                </div>
              </div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">$ 5000</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ 5000</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">$ 10000</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
