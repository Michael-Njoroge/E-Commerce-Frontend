import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate} from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, reset } from '../features/auth/authSlice';


let validationSchema = Yup.object({
    email: Yup.string().email('Provide a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const error = useSelector((state) => state?.auth?.message);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
         validationSchema: validationSchema,
         onSubmit: async (values) => {
            setLoading(true);
            try {
              await dispatch(login(values)).unwrap();
              formik.resetForm();
              setTimeout(() => {
                dispatch(reset());
              }, 5000);
            } catch (error) {
              setTimeout(() => {
                dispatch(reset());
              }, 10000);
              console.warning("Error login:", error);
            } finally {
              setLoading(false);
            }
        },
    });

  const {user,isError,isLoading,isSuccess} = useSelector((state)=>state.auth)

    useEffect(() => {
        if (user !== null && isError === false) {
            navigate("/")
        }else{
            navigate("")
        }
    },[user,isError,isLoading,isSuccess,navigate]);

  return (
    <>
      <Meta title="E-Commerce | Login" />
      <BreadCrumb title="Account" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
                {
                  error ? 
                  (<p className="mt-2 mb-3 text-center text-danger">
                    {error}
                  </p>) : ""
                }
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
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
                  <div>
                    <div className="">
                      <button className="button border-0 w-100 d-flex justify-content-center" disabled={loading} style={{borderRadius:"5px",fontWeight:"bolder"}} type="submit">
                        {loading ? (
                              <div className="d-flex gap-1">
                                <div className="spinner-border spinner-border-sm" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Please wait...
                              </div>
                              ) : 
                             'Login'
                        }
                      </button>
                    </div>
                    <div className="d-flex mt-3 justify-content-between">
                    <span className="fs-6">Don't have an account?<Link to="/signup" className="ms-1 underline-on-hover" style={{fontWeight:"bolder"}}>Sign up</Link></span>
                      <Link to="/forgot-password" className="underline-on-hover" style={{fontWeight:"bolder"}}>Forgot Password?</Link>
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

export default Login;
