import React, {useState} from "react";
import {Link} from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import {useSelector} from 'react-redux'
// import { applyCoupon } from '../features/auth/authSlice';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import api from '../utils/axiosInstance';
import * as Yup from 'yup';
import {loadStripe} from '@stripe/stripe-js';

const shippingValidationSchema = Yup.object({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string().required('Pincode is required'),
});

 const discountValidationSchema = Yup.object().shape({
    coupon: Yup.string().nullable(),
  });

const Checkout = () => {
  const cartState = useSelector((state) => state?.product?.userCart);
   const [loading, setLoading] = useState(false);
   const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const shippingFormik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      shipping_amount: 10.00, 
    },
      validationSchema: shippingValidationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values))
      setLoading(true);
      try {
        const response = await api.post('/create-checkout-session', {
          shipping_info: {
            firstname: values.firstname,
            lastname: values.lastname,
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pincode,
          },
          shipping_amount: values.shipping_amount
        });

        const session = response.data;
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: session.id });
      } catch (error) {
        console.error("Error creating checkout session:", error);
      } finally {
        setLoading(false);
      }
    },
    });

  const discountFormik = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: discountValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
         toast.info("This service is coming soon");
        // dispatch(applyCoupon(values))
      } catch (error) {
        console.error("Error applying discount code:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">Tech Mart</h3>
                <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/cart" className="text-dark total-price">Cart</Link>&nbsp;/</li>
                    <li className="breadcrumb-item total-price active" aria-current="page">Information &nbsp;/</li>
                    <li className="breadcrumb-item total-price active" aria-current="page">Shipping &nbsp;/</li>
                    <li className="breadcrumb-item active" aria-current="page">Payment</li>
                  </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">Michael Njoroge(mikethecoder12@gmail.com)</p>
                <h5 className="mb-3">Shipping Address</h5>
                <form action="" onSubmit={shippingFormik.handleSubmit} className="d-flex flex-wrap justify-content-between gap-15">
                  <div className="w-100">
                    <select 
                      name="country"  
                      id="country" 
                      className="form-control form-select"
                      onChange={shippingFormik.handleChange('country')}
                      value={shippingFormik.values.country} 
                    >
                      <option value="" selected disabled>Select Country</option>
                      <option value="Kenya" >Kenya</option>
                      <option value="Uganda" >Uganda</option>
                      <option value="Tanzania" >Tanzania</option>
                      <option value="Rwanda" >Rwanda</option>
                    </select>
                    <div className="errors">
                    {shippingFormik.touched.country && shippingFormik.errors.country ? (
                    <div>{shippingFormik.errors.country}</div>
                     ) : null}
                  </div>
                  </div>
                 
                  <div className="flex-grow-1">
                    <input 
                      type="text" 
                      placeholder = "First Name" 
                      className="form-control" 
                      name="firstname" 
                      id="firstname"
                      onChange={shippingFormik.handleChange('firstname')}
                      value={shippingFormik.values.firstname} 
                    />
                    <div className="errors">
                    {shippingFormik.touched.firstname && shippingFormik.errors.firstname ? (
                    <div>{shippingFormik.errors.firstname}</div>
                     ) : null}
                  </div>
                  </div>
                  
                     <div className="flex-grow-1">
                    <input 
                      type="text" 
                      placeholder = "Last Name" 
                      className="form-control" 
                      name="lastname" 
                      id="lastname"
                      onChange={shippingFormik.handleChange('lastname')}
                      value={shippingFormik.values.lastname} 
                    />
                    <div className="errors">
                    {shippingFormik.touched.lastname && shippingFormik.errors.lastname ? (
                    <div>{shippingFormik.errors.lastname}</div>
                     ) : null}
                  </div>
                  </div>
                  
                    <div className="flex-grow-1">
                    <input 
                      type="text" 
                      placeholder = "Address" 
                      className="form-control" 
                      name="address" 
                      id="address"
                      onChange={shippingFormik.handleChange('address')}
                      value={shippingFormik.values.address} 
                    />
                    <div className="errors">
                    {shippingFormik.touched.address && shippingFormik.errors.address ? (
                    <div>{shippingFormik.errors.address}</div>
                     ) : null}
                  </div>
                  </div>
                  
                   <div className="w-100">
                    <input type="text" placeholder="Apartment, Suite, etc. (optional)" className="form-control" name="" id=""/>
                  </div>
                    <div className="flex-grow-1">
                    <input 
                      type="text" 
                      placeholder = "City" 
                      className="form-control" 
                      name="city" 
                      id="city"
                      onChange={shippingFormik.handleChange('city')}
                      value={shippingFormik.values.city} 
                    />
                    <div className="errors">
                    {shippingFormik.touched.city && shippingFormik.errors.city ? (
                    <div>{shippingFormik.errors.city}</div>
                     ) : null}
                  </div>
                  </div>
                  
                  <div className="flex-grow-1">
                    <select 
                      name="state" 
                      id="state" 
                      className="form-control form-select"
                      onChange={shippingFormik.handleChange('state')}
                      value={shippingFormik.values.state} 
                      >
                      <option value="" selected disabled>Select State</option>
                      <option value="Nairobi" >Nairobi</option>
                      <option value="Mombasa" >Mombasa</option>
                      <option value="Kisumu" >Kisumu</option>
                    </select>
                     <div className="errors">
                    {shippingFormik.touched.state && shippingFormik.errors.state ? (
                    <div>{shippingFormik.errors.state}</div>
                     ) : null}
                  </div>
                  </div>

                  <div className="flex-grow-1">
                    <input 
                      type="text" 
                      placeholder = "Pin Code" 
                      className="form-control" 
                      name="pincode" 
                      id="pincode"
                      onChange={shippingFormik.handleChange('pincode')}
                      value={shippingFormik.values.pincode} 
                    />
                    <div className="errors">
                    {shippingFormik.touched.pincode && shippingFormik.errors.pincode ? (
                    <div>{shippingFormik.errors.pincode}</div>
                     ) : null}
                  </div>
                  </div>

                  

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                     {/* <Link to="/cart" className="text-dark">
                        <BiArrowBack className="fs-5 me-2"/>
                        Return to Cart
                      </Link>*/}
                      {/*<Link to="/shipping" className="button">Continue to Shipping</Link>/*/}
                      <button 
                        className="bg-danger text-white p-4 fs-5 w-100 border-0 mt-3 " 
                        style={{ borderRadius: '5px', fontWeight: 'bold' }} 
                        type="submit"
                        disabled={loading}
                        >
                       {loading ? "Processing..." : "Pay now"}
                      </button>
                     </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="py-2">
              {
                cartState && cartState.products.map((item, index) => {
                  return(
                    <div key={index} className="d-flex mb-2 py-3  align-items-center gap-10">
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                        <span style={{top:"-10px", right:"2px"}} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">{item?.quantity}</span>
                          <img className="img-fluid" src={item?.product?.images[0]?.file_url} alt="checkout" />
                        </div>
                        <div>
                          <h5 className="total-price">{item?.product?.title}</h5>
                          <p className="total-price">
                            <ul className="colors ps-0">
                                  <li style={{backgroundColor:item?.color?.title}}></li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-grow-1">
                        <h5 className="total">$ {parseFloat(item?.price * item?.quantity).toFixed(2)}</h5>
                      </div>
                    </div>
                  )
                })
              }
              
              </div>
              <div className="py-2">
                <form action="" onSubmit={discountFormik.handleSubmit} className="d-flex col-12 ">
                  <div className="flex-grow-1 col-10">
                    <input
                      type="text"
                      placeholder="Enter Discount Code"
                      className="form-control"
                      name="coupon"
                      id="coupon"
                      readOnly
                      onChange={discountFormik.handleChange('coupon')}
                      value={discountFormik.values.coupon}
                    />
                    <div className="errors">
                      {discountFormik.touched.coupon && discountFormik.errors.coupon ? (
                          <div className="errors">{discountFormik.errors.coupon}</div>
                      ) : null}
                    </div>
                    </div>
                    <button 
                      className="bg-slate-900 fs-6 text-dark px-3 border-0 ms-3 " 
                      style={{ borderRadius: '5px'}} 
                       disabled={loading}
                       type="submit"
                    >
                      Apply
                  </button>
                </form>
               <div className="border-top mt-4 py-2">
                  <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">$ {parseFloat(cartState?.cartTotal ? cartState?.cartTotal : 0).toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">$ {shippingFormik?.values?.shipping_amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center py-4">
                <h4 className="total text-dark" style={{ fontWeight: 'bold'}}>Total</h4>
                <h5 className="total-price text-dark" style={{ fontWeight: 'bold'}} >$ {(parseFloat(cartState?.cartTotal ? cartState?.cartTotal : 0) + 10).toFixed(2)}</h5>
              </div>
               </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default Checkout;
