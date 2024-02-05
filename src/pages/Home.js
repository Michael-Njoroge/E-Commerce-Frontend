import React from "react";
import { NavLink, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative p-3">
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
                <div className="small-banner position-relative p-3">
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
                <div className="small-banner position-relative p-3">
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
                <div className="small-banner position-relative p-3">
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
                <div className="small-banner position-relative p-3">
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
        </div>
      </section>
    </>
  );
};

export default Home;
