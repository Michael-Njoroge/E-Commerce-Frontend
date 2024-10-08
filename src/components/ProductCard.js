import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import productcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addedWish from "../images/wish-black.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import headphone1 from "../images/headphone-1.avif";
import watch6 from "../images/watch6.jpg";
import { addToWishlist } from '../features/product/productSlice';
import { getWishlist } from '../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux'


const ProductCard = (props) => {
  const { grid, data } = props;
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const wishlistState = useSelector((state) =>state?.auth?.get_wishlist);
  const isProductInWishlist = (productId) => {
    return wishlistState?.some((item) => item.id === productId);
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id))
    setTimeout(()=>{
       dispatch(getWishlist());
     },100)
  }
  return (
    <>
    {
      data?.map((item, index) => {
        const alreadyAdded = isProductInWishlist(item.id);
        return (
          <div
          key={index}
          className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}
          >
            <div  className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e) => {addToWish(item?.id)}}>
                   <img src={alreadyAdded ? addedWish : wish} alt="wish" width="18px" height ="18px"/>
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0]?.file_url}
                  className="img-fluid mx-auto"
                  alt="watch"
                />
                <img
                  src="https://res.cloudinary.com/dvnesx7rh/image/upload/v1720461775/blogs/blogs/668c29cd99288_1-fv60015wm01w-fastrack-women-original-imagtwngueejwzcc.jpeg.jpg"
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
                  <Link  to={`/product/${item?.id}`}  className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </Link>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  );
};

export default ProductCard;