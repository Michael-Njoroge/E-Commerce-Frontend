import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../features/auth/authSlice';


let validationSchema = Yup.object({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Provide a valid email').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    password: Yup.string().required('Password is required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
         validationSchema: validationSchema,
         onSubmit: values => {
            dispatch(register(values))
         },
    });

  const {user,isError,isLoading,isSuccess} = useSelector((state)=>state.auth)

    useEffect(() => {
        if (!user == null || isSuccess) {
            navigate("/")
        }else{
            navigate("")
        }
    },[user,isError,isLoading,isSuccess,navigate]);

  return (
    <>
      <Meta title="E-Commerce | Signup" />
      <BreadCrumb title="Signup" />

      <Container class1="login-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                 <CustomInput 
                  type="text" 
                  name="firstname" 
                  placeholder="Firstname" 
                  onChange={formik.handleChange('firstname')}
                  value={formik.values.firstname} 
                  id="firstname" 
                />
                <div className="errors">
                  {formik.touched.firstname && formik.errors.firstname ? (
                  <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>

                 <CustomInput 
                  type="text" 
                  name="lastname" 
                  placeholder="Lastname" 
                  onChange={formik.handleChange('lastname')}
                  value={formik.values.lastname} 
                  id="lastname" 
                />
                <div className="errors">
                  {formik.touched.lastname && formik.errors.lastname ? (
                  <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>

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
                  type="tel" 
                  name="mobile" 
                  placeholder="Mobile" 
                  onChange={formik.handleChange('mobile')}
                  value={formik.values.mobile} 
                  id="mobile" 
                />
                <div className="errors">
                  {formik.touched.mobile && formik.errors.mobile ? (
                  <div>{formik.errors.mobile}</div>
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
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">
                        Create Account
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

export default Signup;
