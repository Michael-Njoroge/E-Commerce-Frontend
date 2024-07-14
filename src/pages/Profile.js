import React, {useState} from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {useDispatch, useSelector} from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../features/auth/authSlice';
import { FiEdit } from "react-icons/fi";

let validationSchema = Yup.object({
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    email: Yup.string().email('Provide a valid email').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
});

const Profile = () => {
	const dispatch = useDispatch();
   	const [edit, setEdit] = useState(true);

  	const userState = useSelector((state) => state.auth.user);
	const formik = useFormik({
	    initialValues: {
	      firstname: userState?.firstname,
	      lastname: userState?.lastname,
	      email: userState?.email,
	      mobile: userState?.mobile,
	    },
	    validationSchema: validationSchema,
	    onSubmit: values => {
		    try {
		        dispatch(updateProfile(values))
		        setTimeout(()=> {
		        	setEdit(true)
		        },100)
		        
		    } catch (error) {
		        console.error("Error updating profile:", error);
		    } 
	    },
    });
    return (
        <>
        	 <Meta title="E-Commerce | Profile" />
		    <BreadCrumb title="My Profile" />
	        <Container class1="cart-wrapper home-wrapper-2 py-5">
	        	<div className="row">
	        	<div className="col-12">
	        		<div className="d-flex justify-content-between align-items-center">
	        			<h3 className="my-3">Update Profile</h3>
	        			<FiEdit className="fs-3" onClick={() => setEdit(false)} style={{cursor: "pointer" }}/>
	        		</div>
	        	</div>
            		<div className="col-12">
	            		<form onSubmit={formik.handleSubmit}>

	            		 <div className="mb-3">
						    <label htmlFor="firstname" className="form-label">First Name</label>
						    <input 
						    	type="text" 
						    	name="firstname" 
						    	className="form-control" 
						    	id="firstname"
						    	onChange={formik.handleChange('firstname')}
						    	onBlur={formik.handleBlur('firstname')}
                  				value={formik.values.firstname} 
                  				disabled={edit}
						    />
						    <div className="errors">
			                  {formik.touched.firstname && formik.errors.firstname ? (
			                  <div>{formik.errors.firstname}</div>
			                  ) : null}
			                </div>
						  </div>

						   <div className="mb-3">
						    <label htmlFor="lastname" className="form-label">Last Name</label>
						    <input 
						    	type="text" 
						    	name="lastname" 
						    	className="form-control" 
						    	id="lastname"
						    	onChange={formik.handleChange('lastname')}
						    	onBlur={formik.handleBlur('lastname')}
                  				value={formik.values.lastname} 
                  				disabled={edit}
						    />
						    <div className="errors">
			                  {formik.touched.lastname && formik.errors.lastname ? (
			                  <div>{formik.errors.lastname}</div>
			                  ) : null}
			                </div>
						  </div>

						  <div className="mb-3">
						    <label htmlFor="email" className="form-label">Email address</label>
						    <input 
						    	type="email" 
						    	name="email" 
						    	className="form-control" 
						    	id="email"
						    	onChange={formik.handleChange('email')}
						    	onBlur={formik.handleBlur('email')}
                  				value={formik.values.email} 
                  				disabled={edit}
						    />
						    <div className="errors">
			                  {formik.touched.email && formik.errors.email ? (
			                  <div>{formik.errors.email}</div>
			                  ) : null}
			                </div>
						  </div>

						  <div className="mb-3">
						    <label htmlFor="mobile" className="form-label">Mobile Number</label>
						    <input 
						    	type="number" 
						    	name="mobile" 
						    	className="form-control" 
						    	id="mobile"
						    	onChange={formik.handleChange('mobile')}
						    	onBlur={formik.handleBlur('mobile')}
                  				value={formik.values.mobile} 
                  				disabled={edit}
						    />
						    <div className="errors">
			                  {formik.touched.mobile && formik.errors.mobile ? (
			                  <div>{formik.errors.mobile}</div>
			                  ) : null}
			                </div>
						</div>

						{
							edit === false && <button type="submit" className="btn btn-primary w-100 mt-3" >Save</button>
						}

						</form>

            		</div>
            	</div>
            </Container>
        </>
    );
};

export default Profile;

