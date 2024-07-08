import React,  { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { toast } from 'react-toastify';
import { AiOutlineHome } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postEnquiry, reset } from '../features/enquiry/enquirySlice';;


let validationSchema = Yup.object({
    name: Yup.string().required('Your name is required'),
    email: Yup.string().email('Provide a valid email').required('Email is required'),
    phone : Yup.string().required('Your mobile number is required'),
    comment : Yup.string().required('Message is required'),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      comment: '',
    },
    validationSchema: validationSchema,
      onSubmit: values => {
      dispatch(postEnquiry(values));
      formik.resetForm();
    },
    });

  const {createdEnquiry,isError,isLoading,isSuccess,message} = useSelector((state)=>state.contact)

    useEffect(() => {
        if (createdEnquiry && isSuccess) {
          toast.success("Comment submitted successfully!");
          dispatch(reset());
        }
    },[createdEnquiry,isError,isLoading,isSuccess]);

  return (
    <>
      <Meta title="E-Commerce | Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8175095926376!2d36.82096247381016!3d-1.2833529987044474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f110049a8886b%3A0xc646c93b7d72eafd!2sNairobi%20town!5e0!3m2!1sen!2ske!4v1707972148217!5m2!1sen!2ske"
                width="600"
                height="450"
                title="Google Map of Nairobi Town"
                className="border-0 w-100"
                allowFullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                    <div>
                      <CustomInput 
                        type="text" 
                        name="text" 
                        placeholder="Name" 
                        onChange={formik.handleChange('name')}
                        value={formik.values.name} 
                        id="name" 
                      />
                      <div className="errors">
                        {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                      <CustomInput 
                        type="text" 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={formik.handleChange('email')}
                        value={formik.values.email} 
                        id="email" 
                      />
                      <div className="errors">
                        {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                       <CustomInput 
                        type="tel" 
                        name="phone" 
                        placeholder="Mobile Number" 
                        onChange={formik.handleChange('phone')}
                        value={formik.values.phone} 
                        id="phone" 
                      />
                      <div className="errors">
                        {formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        name="comment"
                        id="comment"
                        className="w-100 form-control"
                        cols="30"
                        rows="3"
                        value={formik.values.comment} 
                        onChange={formik.handleChange('comment')}
                        placeholder="Message..."
                      ></textarea>
                       <div className="errors">
                        {formik.touched.comment && formik.errors.comment ? (
                        <div>{formik.errors.comment}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <button className="button border-0">Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <AiOutlineHome className="fs-5" />
                        <address className="mb-0">
                          Hno. 277, Near village park, Mombase road, Nairobi,
                          Kenya
                        </address>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel:+254716002152">+254 716002152</a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:mikethecoder12@gmail.com">
                          mikethecoder12@gmaill.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <BiInfoCircle className="fs-5" />
                        <p className="mb-0">Monday - Friday 10am - 8pm</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default Contact;
