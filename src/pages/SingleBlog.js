import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux'
import { getBlog } from '../features/blog/blogSlice';

const SingleBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getBlogId = location.pathname.split("/")[2];

  const newBlog = useSelector((state) =>state.blog);

  const { singleBlog } = newBlog;

  useEffect(() => {
      dispatch(getBlog(getBlogId));
  },[getBlogId])

  return (
    <>
     <Meta title={`E-Commerce | ${singleBlog?.title}`} />
      <BreadCrumb title={singleBlog?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
          <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Find By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
            <div className="row">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" />
                  Go Back
                </Link>
                <h3 className="title">{singleBlog?.title}</h3>
                <img
                  className="w-100 my-4 img-fluid"
                  src={singleBlog?.images[0]?.file_url}
                  alt="blogs"
                />
                <p dangerouslySetInnerHTML={{ __html: singleBlog?.description }}>
                </p>
              </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default SingleBlog;
