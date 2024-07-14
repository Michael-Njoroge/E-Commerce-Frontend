import React, { useState, useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resetPassword, reset } from '../features/auth/authSlice';

let validationSchema = Yup.object({
    password: Yup.string().required('New password is required'),
    password_confirmation: Yup.string().required('Confirm password is required'),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const message = useSelector((state) => state?.auth?.reset_password);
  const error = useSelector((state) => state?.auth?.message);

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const email = params.get('email');
  const token = params.get('token');

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          formik.setFieldValue('email', email);
          formik.setFieldValue('token', token);
        setLoading(true);
        try {
          // alert(JSON.stringify(values))
          await dispatch(resetPassword(values)).unwrap();
          formik.resetForm();
          setTimeout(() => {
            dispatch(reset());
            navigate("/login")
          }, 5000);
        } catch (error) {
          setTimeout(() => {
            dispatch(reset());
          }, 5000);
          console.warning("Error sending reset link:", error);
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
      <Meta title="E-Commerce | Reset Password" />
      <BreadCrumb title="Reset Password" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                {
                  message ? 
                  (<p className="mt-2 mb-3 text-center text-success">
                    {message}
                  </p>) : ""
                }
                {
                  error ? 
                  (<p className="mt-2 mb-3 text-center text-danger">
                    {error}
                  </p>) : ""
                }
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <CustomInput 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={formik.handleChange('password')}
                    value={formik.values.password} 
                    id="password" 
                  />
                  <div className="errors">
                    {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <CustomInput 
                    type="password" 
                    name="password_confirmation" 
                    placeholder="Confirm Password"
                    onChange={formik.handleChange('password_confirmation')}
                    value={formik.values.password_confirmation} 
                    id="password_confirmation" 
                  />
                  <div className="errors">
                    {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                    <div>{formik.errors.password_confirmation}</div>
                    ) : null}
                  </div>
                  <div>
                    <div className="mt-1 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">
                          {loading ? (
                              <div className="d-flex gap-1">
                                <div className="spinner-border spinner-border-sm" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Please wait...
                              </div>
                              ) : 
                             'Reset Password'
                            }
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default ResetPassword;
