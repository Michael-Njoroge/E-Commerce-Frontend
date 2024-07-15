import React, {useEffect, useState} from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProducts from "../components/SpecialProducts";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Meta from "../components/Meta";
import {services} from "../utils/Data.js"
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../features/product/productSlice';
import { getBlogs } from '../features/blog/blogSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [popularProduct, setPopularProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const productState = useSelector((state) => state.product.products);
  const blogState = useSelector((state) => state.blog.blogs);
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const popular = productState.filter(product => product?.tags === 'popular');
    const featured = productState.filter(product => product?.tags === 'featured');
    setPopularProduct(popular);
    setFeaturedProduct(featured);
  },[productState]);

  return (
    <>
    <Container class1='home-wrapper-1 py-5'>
       <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img
                  src="images/main-banner-1.jpg"
                  alt="main-banner"
                  className="img-fluid rounded-3"
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad s13+ Pro</h5>
                  <p>From $999.00 or $47.62/mo</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex gap-10 flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-01.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SAKE</h4>
                    <h5>iPad s13+ Pro</h5>
                    <p>
                      From $999.00 <br /> or $47.62/mo
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-02.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>Buy iPad Air</h5>
                    <p>
                      From $999.00 <br /> or $47.62/mo
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-03.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SAKE</h4>
                    <h5>iPad s13+ Pro</h5>
                    <p>
                      From $999.00 <br /> or $47.62/mo
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-04.jpg"
                    alt="small-banner"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SAKE</h4>
                    <h5>iPad s13+ Pro</h5>
                    <p>
                      From $999.00 <br /> or $47.62/mo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </Container>
      <Meta title="E-Commerce | Home" />
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
              {
                services?.map((i,j) => {
                  return (
                    <div className="d-flex align-items-center gap-15" key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className="mb-0">{i.tagline}</p>
                      </div>
                    </div>
                  );
                })
              }
              </div>
            </div>
          </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
              <div className="categories flex-wrap d-flex align-items-center align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>22 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Head Phones</h6>
                    <p>8 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>22 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Head Phones</h6>
                    <p>8 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
      </Container>
      <Container class1="featured-wrapper home-wrapper-2 py-5">
       <div className="row">
            <div className="col-12">
              <h5 className="section-heading">Featured Collection</h5>
            </div>
            {
             <ProductCard data={featuredProduct} />
            }
          </div>
      </Container>
      <Container class1="famous-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-01.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.69/mo. for 24 mo. *</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-02.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">600 nits of brightness</h6>
                  <p className="text-dark">27-inch 5k Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-03.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">SmartPhones</h5>
                  <h6 className="text-dark">SmartPhone 13 Pro</h6>
                  <p className="text-dark">
                    Now in green. From $999.00 or $41.64/mo. for 24 mo.
                    Footnote*
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/subbanner-04.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Home Speakers</h5>
                  <h6 className="text-dark">Room-filling sound</h6>
                  <p className="text-dark">
                    From $699 or $116.58/mo. for 12 mo.*
                  </p>
                </div>
              </div>
            </div>
          </div>
      </Container>
      <Container class1="special-wrapper home-wrapper-2 py-5">
         <div className="row">
            <div className="col-12">
              <h5 className="section-heading">Special Products</h5>
            </div>
          </div>
          <div className="row">
          {
            productState && productState?.map((item,index) => {
              if (item?.tags === "special") {
                return (
                  <SpecialProducts 
                    key={index} 
                    id={item?.id} 
                    brand={item?.brand?.title} 
                    title={item?.title} 
                    price={item?.price} 
                    sold={item?.sold} 
                    quantity={item?.quantity} 
                    image={item?.images[0]?.file_url}
                    total_rating={item?.total_ratings.toString()}
                  />
                )
              }
            })
          }
          </div>
      </Container>
      <Container class1="featured-wrapper home-wrapper-2 py-5">
       <div className="row">
            <div className="col-12">
              <h5 className="section-heading">Our Popular Products</h5>
            </div>
            {
              <ProductCard data={popularProduct} />
            }
          </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
      </Container>
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
              <h5 className="section-heading">Our Latest News</h5>
            </div>
          </div>
          <div className="row">
          {
            blogState && blogState.map((item,index) => {
              if(index < 4) {
                const maxLength = 100;
                const trimmedDescription = item?.description.length > maxLength
                  ? item?.description.substring(0, maxLength) + '...'
                  : item?.description;
                return (
                  <div className="col-3" key={index}>
                    <BlogCard 
                      id={item?.id}
                      title={item?.title}
                      description={<p dangerouslySetInnerHTML={{ __html: trimmedDescription }}/>}
                      image={item?.images[0]?.file_url}
                      date={moment(item?.created_at).format("MMMM Do, YYYY")}
                    />
                  </div>
                )
              }
            })
          }
          </div>
      </Container>
    </>
  );
};

export default Home;
