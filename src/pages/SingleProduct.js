import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Colors from "../components/Colors";
import {useNavigate, useLocation} from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { getProduct, addToWishlist } from '../features/product/productSlice';

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];

  const productState = useSelector((state) => state.product.singleProduct);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId))
    }
  },[getProductId]);

   const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }

  const props = {width: 400, height: 600, zoomWidth: 600, img: productState?.images[0]?.file_url};
  const [orderProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  return (
    <>
      <Meta title={`E-Commerce | ${productState?.title}`} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-6">
                <div className="main-product-image">
                  <div>
                    <ReactImageZoom {...props} />
                  </div>
                </div>
                <div className="other-product-images d-flex flex-wrap gap-15">
                  <div>
                    <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" alt="images" className="img-fluid"/>
                  </div>
                  <div>
                    <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" alt="images" className="img-fluid"/>
                  </div>
                  <div>
                    <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" alt="images" className="img-fluid"/>
                  </div>
                  <div>
                    <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg" alt="images" className="img-fluid"/>
                  </div>
                </div>
              </div>
                <div className="col-6">
                  <div className="main-product-details">
                    <div className="border-bottom">
                      <h3 className="title">{productState?.title}</h3>
                    </div>
                     <div className="border-bottom py-3">
                      <p className="price">$ {productState?.price}</p>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={productState?.total_ratings.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0 t-review">(2 Reviews)</p>
                      </div>
                      <a className="review-btn" href="#review">Write a Review</a>
                    </div>
                    <div className="py-3">
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Type :</h3>
                        <p className="product-data">Watch</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Brand :</h3>
                        <p className="product-data">{productState?.brand?.title}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Category :</h3>
                        <p className="product-data">{productState?.category?.title}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Tags :</h3>
                        <p className="product-data">{productState?.tags}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Availabilty :</h3>
                        <p className="product-data">{productState?.quantity > 1 ? "In Stock" : "Out of Stock"}</p>
                      </div>
                      <div className="d-flex flex-column gap-10 mt-2 mb-3">
                        <h3 className="product-heading">Size :</h3>
                        <div className="d-flex flex-wrap gap-15">
                          <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                          <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                          <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                          <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>
                        </div>
                      </div>
                       <div className="d-flex flex-column gap-10 mt-2 mb-3">
                        <h3 className="product-heading">Color :</h3>
                        <Colors />
                      </div>
                       <div className="d-flex align-items-center flex-row gap-15 mt-2 mb-3">
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input type="number" defaultValue={1} min={1} max={10} style={{width:"70px"}} className="form-control" />
                        </div>
                        <div className="d-flex align-items-center gap-30 ms-5">
                          <button className="button border-0" type="submit">
                            Add to Cart
                          </button>
                          <button className="signup button" >
                            Buy It Now
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-15">
                        <div>
                          <a href="#">
                          <TbGitCompare className="fs-5 me-2"/>
                          Add to Compare</a>
                        </div>
                        <div>
                          <button className="button border-0" onClick={((e) => {addToWish(productState?.id)})}>
                          <AiOutlineHeart className="fs-5 me-2"/>
                          Add to Wishlist</button>
                        </div>
                      </div>  
                       <div className="d-flex flex-column gap-10 my-3">
                        <h3 className="product-heading">Shipping & Returns :</h3>
                        <p className="product-data">Free Shipping and Returns available on all orders! 
                        <br/>We ship all Kenya domestic orders within 
                        <b> 5-10 bussiness days</b>
                        </p>
                      </div>   
                      <div className="d-flex align-items-center gap-10 my-3">
                        <h3 className="product-heading">Product Link :</h3>
                        <a href="javascript:void(0)" onClick={() => {
                          copyToClipboard(productState?.images[0]?.file_url)
                        }}>
                          Copy Product Link
                        </a>
                      </div>                 
                    </div>
                  </div>
                </div>
            </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p dangerouslySetInnerHTML={{ __html: productState?.description }}> </p>
              </div>
            </div>
          </div>
      </Container>
      <Container id="review" class1="reviews-wrapper  home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4>Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={productState?.total_ratings.toString()}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderProduct && (
                    <div>
                      <a
                        className="text-dark text-decoration-underline"
                        href="#"
                      >
                        Write a review
                      </a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="3"
                        placeholder="Write your comments here"
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="button border-0">Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-4">
                  <div className="review">
                    <div className="d-flex align-items-center gap-10">
                      <h6 className="mb-0">Michael</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={4}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime facere nesciunt nobis est. Illo autem praesentium
                      sed qui cum minima accusantium obcaecati? Maiores, eum
                      totam deleniti aperiam cumque earum. Molestias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h5 className="section-heading">Our Popular Products</h5>
            </div>
            <ProductCard />
          </div>
      </Container>
    </>
  );
};

export default SingleProduct;
