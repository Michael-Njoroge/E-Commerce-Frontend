import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import blogReducer from '../features/blog/blogSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: enquiryReducer
  },
});
