import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword, reset } from '../features/auth/authSlice';


let validationSchema = Yup.object({
    email: Yup.string().email('Email address is incomplete').required('Email is required'),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const message = useSelector((state) => state?.auth?.forgot_password);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
        setLoading(true);
        try {
          await dispatch(forgotPassword(values)).unwrap();
          formik.resetForm();
          setTimeout(() => {
            dispatch(reset());
          }, 8000);
        } catch (error) {
          console.error("Error sending reset link:", error);
        } finally {
          setLoading(false);
        }
      },
    });

    useEffect(() => {
      return () => {
        dispatch(reset());
      };
    }, [dispatch]);

  return (
    <>
      <Meta title="E-Commerce | ForgotPassword" />
      <BreadCrumb title="ForgotPassword" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Forgot Password</h3>
                {
                  message ? 
                  (<p className="mt-2 mb-3 text-center text-success">
                    {message}
                  </p>) : (
                  <p className="mt-2 mb-3 text-center">
                    We will send you an email to reset your password
                  </p>
                  )

                }
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
                      <button className="button border-0" type="submit" disabled={loading}>
                         {loading ? (
                          <div className="d-flex gap-1">
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Please wait...
                          </div>
                          ) : 'Submit'}
                      </button>
                      <Link className="button text-white bg-danger border-0" to="/login" hidden={loading}>Cancel</Link>
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
