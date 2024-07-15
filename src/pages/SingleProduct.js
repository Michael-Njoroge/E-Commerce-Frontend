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
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { toast } from 'react-toastify';
import { getProduct, addToWishlist, getCart, reviewProduct, reset } from '../features/product/productSlice';
import { addToCart } from '../features/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

let validationSchema = Yup.object({
    star: Yup.string().required('Please choose a star to rate the product'),
    comment: Yup.string().required('Please provide a comment'),
});

const SingleProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getProductId = location.pathname.split("/")[2];
  const cartState = useSelector((state) => state.product?.userCart?.products);
  const productState = useSelector((state) =>state.product);
  const productsState = useSelector((state) => state.product.products);
  const authState = useSelector((state) => state?.auth?.user);
  const { singleProduct } = productState;

  useEffect(() => {
      dispatch(getProduct(getProductId))
      dispatch(getCart())
  },[getProductId, dispatch]);

  useEffect(() => {
    const popular = productsState.filter(product => product?.tags === 'popular');
    setPopularProduct(popular);
  },[productsState]);

  useEffect(() => {
   if (cartState) {
      for (let i = 0; i < cartState.length; i++) {
        if (getProductId === cartState[i]?.product?.id) {
          setAlreadyAdded(true)
        }
      }
    }
  },[getProductId, cartState])

  const addToWish = (id) => {
    dispatch(addToWishlist(id))
  }

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose a color")
    }else{
      dispatch(addToCart({product: singleProduct?.id, quantity: quantity, color: color}))
      navigate("/cart")
    }
  }

  // const closeModal = () => {}

  const props = {width: 400, height: 600, zoomWidth: 600, img: singleProduct?.images[0]?.file_url ? singleProduct?.images[0]?.file_url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"};
  const [orderProduct] = useState(true);
  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 3000); 
  }

  const formik = useFormik({
    initialValues: {
      star: 1,
      comment: '',
      product: getProductId || ''
    },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          // alert(JSON.stringify(values))
        setLoading(true);
        try {
          await dispatch(reviewProduct(values)).unwrap();
          formik.resetForm();
          setTimeout(() => {
            dispatch(reset());
            dispatch(getProduct(getProductId))
          }, 100);
        } catch (error) {
          console.error("Error sending reset link:", error);
        } finally {
          setLoading(false);
        }
      },
    });
  return (
    <>
      <Meta title={`E-Commerce | ${singleProduct?.title}`} />
      <BreadCrumb title={singleProduct?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-6">
                <div className="main-product-image">
                  <div>
                    <ReactImageZoom {...props} />
                  </div>
                </div>
                <div className="other-product-images d-flex flex-wrap gap-15">
                {
                  singleProduct?.images.map((item,index) => {
                    return (
                      <div key={index}>
                        <img src={item?.file_url} alt="images" className="img-fluid"/>
                      </div>
                    )
                  })
                }
                </div>
              </div>
                <div className="col-6">
                  <div className="main-product-details">
                    <div className="border-bottom">
                      <h3 className="title">{singleProduct?.title}</h3>
                    </div>
                     <div className="border-bottom py-3">
                      <p className="price">$ {singleProduct?.price}</p>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={24}
                          value={singleProduct?.total_ratings.toString()}
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
                        <p className="product-data">{singleProduct?.brand?.title}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Category :</h3>
                        <p className="product-data">{singleProduct?.category?.title}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Tags :</h3>
                        <p className="product-data">{singleProduct?.tags}</p>
                      </div>
                      <div className="d-flex align-items-center gap-10 my-2">
                        <h3 className="product-heading">Availabilty :</h3>
                        <p className="product-data">{singleProduct?.quantity > 1 ? "In Stock" : "Out of Stock"}</p>
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
                       {
                        alreadyAdded === false && 
                        <>
                          <div className="d-flex flex-column gap-10 mt-2 mb-3">
                            <h3 className="product-heading">Color :</h3>
                            <Colors setColor={setColor} colorData={singleProduct?.colors} selectedColor={color}/>
                          </div>
                        </>
                       }
                       <div className="d-flex align-items-center flex-row gap-15 mt-2 mb-3">
                       {
                        alreadyAdded === false && 
                        <>
                          <h3 className="product-heading">Quantity :</h3>
                          <div className="">
                            <input 
                              type="number" 
                              value={quantity} 
                              onChange={(e) => setQuantity(e.target.value) } 
                              min={1} 
                              max={(singleProduct?.quantity ?? 0) - (singleProduct?.sold ?? 0)} 
                              style={{width:"70px"}} 
                              className="form-control" 
                            />
                          </div>
                        </>
                       }
                        <div className={alreadyAdded ? "ms-0" : "d-flex align-items-center gap-30 ms-5"}>
                          <button 
                            className="button border-0" 
                            type="button"
                            // data-bs-toggle="modal" 
                            // data-bs-target="#staticBackdrop" 
                            onClick={() => {alreadyAdded ? navigate("/cart") : uploadCart()}}
                          >
                            {
                              alreadyAdded ? "Go to Cart" : "Add to Cart" 
                            }
                          </button>
                         {/* <button className="signup button" >
                            Buy It Now
                          </button>*/}
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-15">
                        <div>
                          <a href="javascript:void(0)">
                          <TbGitCompare className="fs-5 me-2"/>
                          Add to Compare</a>
                        </div>
                        <div>
                          <a href="javascript:void(0)" onClick={((e) => {addToWish(singleProduct?.id)})}>
                          <AiOutlineHeart className="fs-5 me-2"/>
                          Add to Wishlist</a>
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
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            copyToClipboard(window.location.href);
                          }}
                        >
                          {copyStatus ? "Copied!" : "Copy Product Link"}
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
                <p dangerouslySetInnerHTML={{ __html: singleProduct?.description }} />
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
                        value={singleProduct?.total_ratings}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on {singleProduct?.ratings.length} Review(s)</p>
                    </div>
                  </div>
                  {orderProduct  && authState !== null && (
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
                {authState !== null &&
                  <div className="review-form py-4">
                    <h4>Write a Review</h4>
                    <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          onChange={(newRating) => formik.setFieldValue('star', newRating)}
                          value={formik.values.star} 
                          edit={true}
                          name="star" 
                          activeColor="#ffd700"
                        />
                        <div className="errors">
                          {formik.touched.star && formik.errors.star ? (
                          <div>{formik.errors.star}</div>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <textarea
                          id="comment"
                          className="w-100 form-control"
                          cols="30"
                          rows="3"
                          placeholder="Write your comments here"
                          name="comment" 
                          onChange={formik.handleChange('comment')}
                          value={formik.values.comment} 
                        ></textarea>
                        <div className="errors">
                          {formik.touched.comment && formik.errors.comment ? (
                          <div>{formik.errors.comment}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button className="button border-0" type="submit">
                          {loading ? (
                            <div className="d-flex gap-1">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              Please wait...
                            </div>
                            ) : 
                           'Submit Review'
                          }
                        </button>
                      </div>
                    </form>
                  </div>
                }
                <div className="reviews mt-4">
                {
                  singleProduct?.ratings.map((item,index) => {
                    return(
                      <div key={index} className="review">
                      <div className="d-flex align-items-center gap-10">
                        <h6 className="mb-0">{item?.ratedBy?.firstname}</h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.star}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">
                        {item?.comment}
                      </p>
                    </div>
                  )
                  })
                }
                  
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
            <ProductCard data={popularProduct} />
          </div>
      </Container>
     {/* <div 
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-3 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} alt="product image" className="img-fluid"/>
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: 23</p>
                  <p className="mb-1">Color: sdsd</p>
                  <p className="mb-1">Size: fssd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button className="button  border-0" type="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button className="button signup" type="button">
                Checkout 
              </button>
            </div>
            <div className="d-flex justfy-content-center p-3">
              <Link className="text-dark underline-on-hover" to="/product" onClick={()=>{closeModal()}}>Continue To Shipping </Link>
            </div>
          </div>      
        </div>        
      </div>*/}
    </>
  );
};

export default SingleProduct;
