import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import productcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import headphone1 from "../images/headphone-1.avif";
import watch6 from "../images/watch6.jpg";
import { addToWishlist } from '../features/product/productSlice';
import {useDispatch, useSelector} from 'react-redux'


const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();

  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }
  return (
    <>
    {
      data?.map((item, index) => {
        return (
          <div
          key={index}
          className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}
          >
            <Link to={`${location.pathname !== "/product" ? `/product/${item?.id}` : `${item?.id}`}`} className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e) => {addToWish(item?.id)}}>
                  <img src={wish} alt="wish" />
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0]?.file_url}
                  className="img-fluid mx-auto"
                  alt="watch"
                />
                <img
                  src="https://res.cloudinary.com/dvnesx7rh/image/upload/v1720448619/products/products/668bf6691a1d0_1-9180-skylona-men-original-imagsz6hgfgjwqhd.jpeg-removebg-preview.png"
                  className="img-fluid"
                  alt="watch1"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand?.title}</h6>
                <h5 className="product-title">
                  {item?.title}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.total_ratings.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                >
                </p>
                <p className="price">$ {item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={productcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="cart" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )
      })
    }
    </>
  );
};

export default ProductCard;