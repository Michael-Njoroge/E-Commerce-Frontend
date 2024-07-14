import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../features/auth/authSlice';


let validationSchema = Yup.object({
    email: Yup.string().email('Email address is incomplete').required('Email is required'),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
         validationSchema: validationSchema,
         onSubmit: values => {
         // alert(JSON.stringify(values))
            dispatch(forgotPassword(values))
         },
    });

  return (
    <>
      <Meta title="E-Commerce | ForgotPassword" />
      <BreadCrumb title="ForgotPassword" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Forgot Password</h3>
                <p className="mt-2 mb-3 text-center">
                  We will send you an email to reset your password
                </p>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                 <CustomInput 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    onChange={formik.handleChange('email')}
                    value={formik.values.email} 
                  />
                  <div className="errors">
                    {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Submit
                      </button>
                      <Link className="button text-white bg-danger border-0" to="/login">Cancel</Link>
                    </div>
                </form>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
