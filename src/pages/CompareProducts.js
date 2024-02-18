import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Colors from "../components/Colors";

const CompareProducts = () => {
  return (
    <>
      <Meta title="E-Commerce | Compare-Products" />
      <BreadCrumb title="Compare Products" />
      <div className="compare-products-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honr T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3GB Tablet
                  </h5>
                  <h6 className="price mb-3 mt-3">$ 100.00</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Tablet Computers</p>
                    </div>
                    <div className="product-detail">
                      <h5>SKU:</h5>
                      <p>SKU033</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Colors />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>

                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                        <p>L</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">
                    Honr T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3GB Tablet
                  </h5>
                  <h6 className="price mb-3 mt-3">$ 100.00</h6>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Tablet Computers</p>
                    </div>
                    <div className="product-detail">
                      <h5>SKU:</h5>
                      <p>SKU033</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availability:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Colors />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>

                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
                        <p>L</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProducts;
