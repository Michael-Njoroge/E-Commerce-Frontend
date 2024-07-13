import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../features/auth/authSlice';
import { Link } from "react-router-dom";
import { addToWishlist } from '../features/product/productSlice';

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistState = useSelector((state) =>state?.auth?.get_wishlist);

  useEffect(() => {
    const fetchWish = () => {
      dispatch(getWishlist());
    };
    fetchWish();
  }, [dispatch]);

  const removeFromWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getWishlist());
    }, 100);
  }

  return (
    <>
      <Meta title="E-Commerce | Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
          <div className="row">
            {
              wishlistState && wishlistState.length === 0 && (
                <div className="text-center fs-3">
                  Your wishlist is empty
                </div>
              )
            }
            {
              wishlistState && wishlistState?.map((item,index) => {
                return (
                  <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                      onClick={(e) => {removeFromWish(item?.id)}}
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={item?.images[0]?.file_url}
                        alt="watch"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="py-3 px-3">
                    <Link to={`/product/${item?.id}`} className="text-dark border-0 bg-transparent underline-on-hover">
                      <h5 className="title">{item?.title}</h5>
                    </Link>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                </div>
                </div>
                )
              })
            }
          </div>
      </Container>
    </>
  );
};

export default Wishlist;
