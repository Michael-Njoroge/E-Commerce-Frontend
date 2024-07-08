import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../features/auth/authSlice';
import { addToWishlist } from '../features/product/productSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const getUser = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

  const newProduct = useSelector((state) =>state.auth);
  const { get_wishlist } = newProduct;

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    dispatch(getWishlist(getUser.id));
  }


  useEffect(() => {
    if (getUser) {
      dispatch(getWishlist(getUser.id));
    }
  }, [dispatch,getUser]);

  return (
    <>
      <Meta title="E-Commerce | Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
            {
              get_wishlist && get_wishlist?.map((item,index) => {
                return (
                  <div key={index} className="wishlist-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image">
                      <img
                        src={item?.images[0]?.file_url}
                        alt="watch"
                        className="img-fluid w-100"
                        onClick={() => {addToWish(item?.id)}}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">$ {item?.price}</h6>
                    </div>
                </div>
                )
              })
            }
            </div>
          </div>
      </Container>
    </>
  );
};

export default Wishlist;
