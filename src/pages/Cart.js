import React, {useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import Container from "../components/Container";
import { getCart, updateProductQuantity } from '../features/product/productSlice';
import {useDispatch, useSelector} from 'react-redux'
import { removeProductFromCart, reset } from '../features/auth/authSlice';


const Cart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.product.userCart);

  useEffect(() => {
    const getUserCart = () => {
      dispatch(getCart());
    };
    getUserCart()
  }, []);

  const removeProduct = (item) => {
    dispatch(removeProductFromCart({product: item?.product?.id, color: item?.color?.id }))
    setTimeout(() => {
      dispatch(getCart());
    },100)
  }

  const updateQty = (e,item) => {
    dispatch(updateProductQuantity({product: item?.product?.id, color: item?.color?.id, quantity: e}))
    setTimeout(() => {
      dispatch(getCart());
    },100)
  }
  return (
    <>
      <Meta title="E-Commerce | Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex align-items-center justify-content-between">
              	<h4 className="cart-col-1">Product</h4>
              	<h4 className="cart-col-2">Price</h4>
              	<h4 className="cart-col-3">Quantity</h4>
              	<h4 className="cart-col-4">Total</h4>
              </div>
        {/*      {
                (!cartState || cartState.length === 0) && (
                  <div className="text-center fs-3">
                    Your cart is empty
                  </div>
                )
              }*/}
              {
                cartState && cartState?.products.map((item, index) => {
                  {/*{console.log(item)}*/}
                  return( 
                    <div key={index} className="cart-data mb-2 py-3 d-flex align-items-center justify-content-between">
                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                          <div className="w-25">
                            <img src={item?.product?.images[0]?.file_url} className="img-fluid" alt="product"/>
                          </div>
                          <div className="w-75">
                            <p>{item?.product?.title}</p>
                            {/*<p>Size : sfdwfds</p>*/}
                            <p className="d-flex gap-3">Color : 
                                <ul className="colors ps-0">
                                  <li style={{backgroundColor:item?.color?.title}}></li>
                                </ul>
                              </p>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">$ {item?.product?.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input 
                              type="number" 
                              defaultValue={item?.quantity} 
                              className="form-control" 
                              name="" 
                              id="" 
                              min={1} 
                              max={item?.product?.quantity - item?.product?.sold} 
                              onChange={(e) => updateQty(e.target.value, item) } 
                            />
                          </div>
                          <div>
                            <AiFillDelete style={{cursor: 'pointer'}} onClick={() => {removeProduct(item)}} className="text-danger"/>
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">$ {item?.quantity * item?.product?.price}</h5>
                        </div>
                    </div>
                )
                })
              }
              
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link className="button" to="/product">Continue To Shopping</Link>
                <div className="d-flex align-items-end flex-column">
                  <h4>Sub Total : $ {cartState?.cartTotal ? cartState?.cartTotal : 0}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link className="button" to="/checkout">Checkout</Link>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default Cart;
