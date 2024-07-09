import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const {id, title, description, image, date} = props
  console.log('description',description)
  return (
    <>
      <div className="blog-card">
        <div className="blog-images">
          <img src={image} alt="blog" className="img-fluid w-100" />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{title}</h5>
          <p className="description">{description}</p>
          <Link to={`/blog/${id}`} className="button">
            READ MORE
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
