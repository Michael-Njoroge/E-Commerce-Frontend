import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <>
      <div className="blog-card">
        <div className="blog-images">
          <img src="images/blog-1.jpg" alt="blog" className="img-fluid w-100" />
        </div>
        <div className="blog-content">
          <p className="date">11 June, 2023</p>
          <h5 className="title">A Beatiful Sunday Morning Renaissance</h5>
          <p className="description">
            Your're Only As Good As Your Last Collection,Which Is An Enomous
            Pressure. I Think There Is Something About...
          </p>
          <Link to="/" className="button">
            READ MORE
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
