import React, {useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import {useDispatch, useSelector} from 'react-redux'
import { getCart } from '../features/product/productSlice';

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.product.userCart);
  const authState = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+254 716002152">
                  +254 716002152
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">Tech Mart</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-products"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare"></img>
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist"></img>
                    <p className="mb-0">
                      Favourite <br />
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState === null ? "/login" : "#"}
                    className="d-flex align-items-center gap-10 text-white"
                    id={authState !== null ? "navbarDropdown" : undefined}
                    role={authState !== null ? "button" : undefined}
                    data-bs-toggle={authState !== null ? "dropdown" : undefined}
                    aria-expanded={authState !== null ? "false" : undefined}
                  >
                    <img src={user} alt="user"></img>
                    {authState === null && (
                      <p className="mb-0">
                      Log In <br />
                      My Account
                    </p>
                    )} 
                    {authState !== null && (
                      <p className="mb-0">
                      Welcome <br />
                      {authState?.firstname}
                    </p>
                    )} 
                  </Link>
                  <div className="dropdown-menu animate slideIn mt-3" aria-labelledby="navbarDropdown">
                    <Link to={"/my-profile"} className="dropdown-item">Profile/Account</Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item border-0 bg-transparent" type="button" onClick={()=>handleLogout()}>Logout</button>
                  </div>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart"></img>
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cartState?.products.length ? cartState?.products.length : 0}</span>
                      <p className="mb-0">$ {cartState?.cartTotal ? cartState?.cartTotal : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="menu" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu mt-2"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    {authState !== null &&
                      <NavLink to="/my-orders">Orders</NavLink>
                    }
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
