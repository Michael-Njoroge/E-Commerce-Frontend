import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProducts = (props) => {
  const {title, brand, total_rating, price, quantity, sold, image} = props
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-center gap-30">
            <div>
              <img src={image} className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={total_rating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">$ {price}</span>
                {/*&nbsp; <strike>$200</strike>*/}
              </p>
              <div className="discount-till d-flex align-items-center gap-10 ">
                <p className="mb-0">
                  <b>5</b> Days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="product-count my-3">
                <p>Products: {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: (quantity / (quantity + sold)) * 100 + "%" }}
                    aria-valuenow={(quantity / (quantity + sold)) * 100 }
                    aria-valuemin={quantity}
                    aria-valuemax={quantity + sold}
                  ></div>
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProducts;
