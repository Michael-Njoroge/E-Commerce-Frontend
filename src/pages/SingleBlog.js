import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blogs from "../images/blog-1.jpg";

const SingleBlog = () => {
  return (
    <>
      <Meta title="E-Commerce | Dynamic Blog Name" />
      <BreadCrumb title="Dynamic Blog Name" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" />
                  Go Back
                </Link>
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  className="w-100 my-4 img-fluid"
                  src={blogs}
                  alt="blogs"
                />
                <p>
                  You’re only as good as your last collection, which is an
                  enormous pressure. I think there is something about luxury –
                  it’s not something people need, but it’s what they want. It
                  really pulls at their heart. I have a fantastic relationship
                  with money.Scelerisque sociosqu ullamcorper urna nisl mollis
                  vestibulum pretium commodo inceptos cum condimentum placerat
                  diam venenatis blandit hac eget dis lacus a parturient a
                  accumsan nisl ante vestibulum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
