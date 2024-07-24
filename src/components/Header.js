import React, {useEffect, useState} from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import {useDispatch, useSelector} from 'react-redux'
import { getCart } from '../features/product/productSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD $');
  const cartState = useSelector((state) => state?.product?.userCart);
  const productState = useSelector((state) => state?.product?.products);
  const authState = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    let data = [];
    for (var i = 0; i < productState.length; i++) {
      const element = productState[i];
      data.push({id: i, product: element?.id, name: element?.title})
    }
    setProductOpt(data)
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  }


  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log(`Selected language: ${selectedLanguage}`);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    console.log(`Selected Currency: ${selectedCurrency}`);
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row d-flex justify-content-between">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6 d-flex gap-3 justify-content-end">
              <p className="text-end text-white mb-0 border-0">
                Hotline:
                <a className="text-white ms-1" href="tel:+254 716002152">
                  +254 716002152
                </a>
              </p>
              <div class="dropdown">
                <select
                  class="bg-transparent text-white border-0 animate slideIn"
                  aria-label="Select language"
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="en" selected>English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="ru">Русский</option>
                  <option value="uk">Українська</option>
                </select>
              </div>

               <div class="dropdown">
                <select
                  class="bg-transparent text-white border-0 animate slideIn"
                  aria-label="Select language"
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                >
                  <option value="USD" selected>United States (USD $)</option>
                  <option value="SAR">Saudi Arabia (SAR ر.س)</option>
                  <option value="RUB">Russia (RUB ₽)</option>
                  <option value="EUR">France (EUR €)</option>
                  <option value="EUR">Spain (EUR €)</option>
                  <option value="UAH">Ukraine (UAH ₴)</option>
                </select>
              </div>

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
                  <Typeahead
                    id="pagination-example"
                    onPaginate={() => console.log('Results paginated')}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    minLength={2}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0].product}`)
                    }}
                    placeholder="Search for products here..."
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
                    to="#"
                    className="d-flex align-items-center gap-10 text-white"
                    id={authState !== null ? "navbarDropdown" : "navbarDropdown1"}
                    role={authState !== null ? "button" : undefined}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
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
                  {authState !== null ? (
                    <div
                      className="dropdown-menu animate slideIn mt-3"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link to={"/my-profile"} className="dropdown-item">
                        Profile/Account
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item border-0 bg-transparent"
                        type="button"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div
                      className="dropdown-menu animate slideIn mt-3"
                      aria-labelledby="navbarDropdown1"
                    >
                      <Link to={"/login"} className="dropdown-item">
                        Sign In
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to={"/signup"} className="dropdown-item">
                        Sign Up
                      </Link>
                    </div>
                  )}
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
//////////////////////////////
// import React, { useEffect, useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import compare from "../images/compare.svg";
// import wishlist from "../images/wishlist.svg";
// import user from "../images/user.svg";
// import cart from "../images/cart.svg";
// import menu from "../images/menu.svg";
// import { useDispatch, useSelector } from 'react-redux';
// import { getCart } from '../features/product/productSlice';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
// import { FaBars, FaTimes } from 'react-icons/fa';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [paginate, setPaginate] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [productOpt, setProductOpt] = useState([]);
//   const cartState = useSelector((state) => state?.product?.userCart);
//   const productState = useSelector((state) => state?.product?.products);
//   const authState = useSelector((state) => state?.auth?.user);

//   useEffect(() => {
//     dispatch(getCart());
//   }, [dispatch]);

//   useEffect(() => {
//     let data = [];
//     for (var i = 0; i < productState.length; i++) {
//       const element = productState[i];
//       data.push({ id: i, product: element?.id, name: element?.title });
//     }
//     setProductOpt(data);
//   }, [productState]);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <>
//       {/* Header for small screens */}
//       <header className="d-block d-lg-none">
//         <div className="header-top-strip py-3 text-center">
//           <p className="text-white mb-0">
//             Hotline: <a className="text-white" href="tel:+254716002152">+254 716002152</a>
//           </p>
//         </div>
//         <div className="header-upper px-3 d-flex align-items-center justify-content-between">
//           <div className="d-flex flex-row align-items-center gap-10">
//            <button className="bg-transparent border-0 text-white fs-4" onClick={() => setMenuOpen(!menuOpen)}>
//               {menuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//             <h2 className="text-white mb-0">
//               <Link className="text-white">Tech Mart</Link>
//             </h2>
//           </div>
//         {menuOpen && (
//           <div className="bg-light">
//             <ul className="list-unstyled">
//               <li><a href="/" className="text-dark">Home</a></li>
//               <li><a href="/product" className="text-dark">Our Store</a></li>
//               <li><a href="/blogs" className="text-dark">Blogs</a></li>
//               <li><a href="/contact" className="text-dark">Contact</a></li>
//             </ul>
//           </div>
//         )}
//         <div className="p-3 d-flex align-items-center justify-content-between">
//           <div className="d-flex align-items-center gap-10">
//             <Link to="/compare-products" className="text-white">
//               <img src={compare} alt="compare" />
//             </Link>
//             <Link to="/wishlist" className="text-white">
//               <img src={wishlist} alt="wishlist" />
//             </Link>
//             <Link
//               to={authState === null ? "/login" : "#"}
//               className="d-flex align-items-center gap-10 text-white"
//               id={authState !== null ? "navbarDropdown" : undefined}
//               role={authState !== null ? "button" : undefined}
//               data-bs-toggle={authState !== null ? "dropdown" : undefined}
//               aria-expanded={authState !== null ? "false" : undefined}
//             >
//               <img src={user} alt="user" />
//           </Link>
//             <Link to="/cart" className="text-white">
//               <img src={cart} alt="cart" />
//             </Link>
//           </div>
//         </div>
//         </div>
//       </header>

//       {/* Header for large screens */}
//       <header className="header-top-strip py-3 sticky-top d-none d-lg-block">
//         <div className="container-xxl hidden lg:block">
//           <div className="row">
//             <div className="col-6">
//               <p className="text-white mb-0">
//                 Free Shipping Over $100 & Free Returns
//               </p>
//             </div>
//             <div className="col-6">
//               <p className="text-end text-white mb-0">
//                 Hotline:
//                 <a className="text-white" href="tel:+254716002152">
//                   +254 716002152
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>
//       <header className="header-upper py-3 sticky-top d-none d-lg-block">
//         <div className="container-xxl">
//           <div className="row align-items-center">
//             <div className="col-2">
//               <h2>
//                 <Link className="text-white">Tech Mart</Link>
//               </h2>
//             </div>
//             <div className="col-5">
//               <div className="input-group">
//                 <Typeahead
//                   id="pagination-example"
//                   onPaginate={() => console.log('Results paginated')}
//                   options={productOpt}
//                   paginate={paginate}
//                   labelKey={"name"}
//                   minLength={2}
//                   onChange={(selected) => {
//                     navigate(`/product/${selected[0].product}`);
//                   }}
//                   placeholder="Search for products here..."
//                 />
//                 <span className="input-group-text p-3" id="basic-addon2">
//                   <BsSearch className="fs-6" />
//                 </span>
//               </div>
//             </div>
//             <div className="col-5">
//               <div className="header-upper-links d-flex align-items-center justify-content-between">
//                 <div>
//                   <Link to="/compare-products" className="d-flex align-items-center gap-10 text-white">
//                     <img src={compare} alt="compare" />
//                     <p className="mb-0">Compare <br /> Products</p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
//                     <img src={wishlist} alt="wishlist" />
//                     <p className="mb-0">Favourite <br /> Wishlist</p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link
//                     to={authState === null ? "/login" : "#"}
//                     className="d-flex align-items-center gap-10 text-white"
//                     id={authState !== null ? "navbarDropdown" : undefined}
//                     role={authState !== null ? "button" : undefined}
//                     data-bs-toggle={authState !== null ? "dropdown" : undefined}
//                     aria-expanded={authState !== null ? "false" : undefined}
//                   >
//                     <img src={user} alt="user" />
//                     {authState === null ? (
//                       <p className="mb-0">Log In <br /> My Account</p>
//                     ) : (
//                       <p className="mb-0">Welcome <br /> {authState?.firstname}</p>
//                     )}
//                   </Link>
//                   <div className="dropdown-menu animate slideIn mt-3" aria-labelledby="navbarDropdown">
//                     <Link to={"/my-profile"} className="dropdown-item">Profile/Account</Link>
//                     <div className="dropdown-divider"></div>
//                     <button className="dropdown-item border-0 bg-transparent" type="button" onClick={() => handleLogout()}>Logout</button>
//                   </div>
//                 </div>
//                 <div>
//                   <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
//                     <img src={cart} alt="cart" />
//                     <div className="d-flex flex-column gap-10">
//                       <span className="badge bg-white text-dark">{cartState?.products.length ? cartState?.products.length : 0}</span>
//                       <p className="mb-0">$ {cartState?.cartTotal ? cartState?.cartTotal : 0}</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <header className="header-bottom py-3 d-none d-lg-block">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-12 d-flex align-items-center justify-content-between">
//               <div className="menu-bottom d-flex align-items-center">
//                 <div>
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
//                       type="button"
//                       id="dropdownMenuButton1"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <img src={menu} alt="menu" />
//                       <span className="me-5 d-inline-block">Shop Categories</span>
//                     </button>
//                     <ul className="dropdown-menu mt-2" aria-labelledby="dropdownMenuButton1">
//                       <li><Link className="dropdown-item text-white" to="">Action</Link></li>
//                       <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
//                       <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="menu-links">
//                   <div className="d-flex align-items-center gap-15">
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/product">Our Store</NavLink>
//                     {authState !== null && <NavLink to="/my-orders">Orders</NavLink>}
//                     <NavLink to="/blogs">Blogs</NavLink>
//                     <NavLink to="/contact">Contact</NavLink>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;
