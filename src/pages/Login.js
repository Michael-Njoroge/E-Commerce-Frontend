import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate} from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice';


let validationSchema = Yup.object({
    email: Yup.string().email('Provide a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
         validationSchema: validationSchema,
         onSubmit: values => {
            dispatch(login(values))
         },
    });

  const {user,isError,isLoading,isSuccess,message} = useSelector((state)=>state.auth)

    useEffect(() => {
        if (!user == null || isSuccess) {
            navigate("/")
        }else{
            navigate("")
        }
    },[user,isError,isLoading,isSuccess]);

  return (
    <>
      <Meta title="E-Commerce | Login" />
      <BreadCrumb title="Account" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Login</h3>
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
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Login
                      </button>
                      <Link className="signup button" to="/signup">
                        Signup
                      </Link>
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
