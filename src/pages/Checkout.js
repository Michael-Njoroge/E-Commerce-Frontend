import React, {useState} from "react";
import {Link} from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import {useSelector} from 'react-redux'
// import { applyCoupon } from '../features/auth/authSlice';
import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
import api from '../utils/axiosInstance';
import * as Yup from 'yup';

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
   const [showAlert, setShowAlert] = useState(false);
   const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

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
      setLoading(true);
      try {
        await api.post('/create-checkout-session', {
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
         setShowModal(true);
        
      } catch (error) {
        console.error("Error creating checkout session:", error);
      } finally {
        setLoading(false);
      }
    },
    });

  const handleTransactionSubmit = async () => {
    console.log("transactionId",transactionId);
    //  setLoading(true);
    // try {
    //   const response = await api.post('/verify-payment', { transaction_id: transactionId });
    //   if (response.data.status === 'success') {
    //     console.log('Payment verified successfully');
    //     // Redirect or show success message
    //   } else {
    //     console.error('Invalid transaction ID');
    //     // Show error message
    //   }
    // } catch (error) {
    //   console.error("Error verifying payment:", error);
    // } finally {
    //   setLoading(false);
    //   setShowModal(false);
    // }
  };

  const discountFormik = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: discountValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
         // toast.info("This service is coming soon");
         setShowAlert(true);
        // dispatch(applyCoupon(values))
         setTimeout(()=>{
          setShowAlert(false)
         },5000)
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
       {showAlert && (
          <div className="alert alert-primary d-flex align-items-center justify-content-center" role="alert">
            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
              <use xlinkHref="#info-fill"/>
            </svg>
            <div>
              This service is coming soon, we value  you as our customer 
            </div>
          </div>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </symbol>
        </svg>
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
       {showModal && (
      <div 
         className="modal fade show blur" 
         style={{ display: 'block' }}
      >
        <div className="modal-dialog mt-3">
          <div className="modal-content">
            <div className="modal-header  border-0">
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)} 
                aria-label="Close"
              ></button>
            </div>
            <p className="text-center">Please complete the payment on your mobile device.</p>
            <div className="modal-body  ">
            <input 
              type="text" 
              className="form-control"
              placeholder="Enter Transaction ID (eg. SGJ250MTU2)" 
              value={transactionId}
              required
              onChange={(e) => setTransactionId(e.target.value)}
            />
            </div>
            <div className="modal-footer border-0 justify-content-center gap-30">
              <button className="button border-0 w-100" onClick={handleTransactionSubmit} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Payment'}
            </button>
            </div>
          </div>      
        </div>        
      </div>
      )}
    </>
  );
};

export default Checkout;
