import React, {useEffect} from "react";
import moment from 'moment';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { getBlogs } from '../features/blog/blogSlice';
import {useDispatch, useSelector} from 'react-redux'


const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blogs);

  const getAllBlogs = () => {
    dispatch(getBlogs());
  };

  useEffect(() => {
    getAllBlogs()
  }, []);
  return (
    <>
      <Meta title="E-Commerce | Blogs" />
      <BreadCrumb title="Blogs" />
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
                  {
                    blogState && blogState.map((item,index) => {
                      const maxLength = 100;
                      const trimmedDescription = item?.description.length > maxLength
                        ? item?.description.substring(0, maxLength) + '...'
                        : item?.description;
                        return (
                          <div className="col-6 mb-3" key={index}>
                            <BlogCard 
                              id={item?.id}
                              title={item?.title}
                              description={<p dangerouslySetInnerHTML={{ __html: trimmedDescription }}/>}
                              image={item?.images[0]?.file_url}
                              date={moment(item?.created_at).format("MMMM Do, YYYY")}
                            />
                          </div>
                        )
                    })
                  }
              </div>
            </div>
          </div>
      </Container>
    </>
  );
};

export default Blogs;
