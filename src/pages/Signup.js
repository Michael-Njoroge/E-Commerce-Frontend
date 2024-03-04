import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <Meta title="E-Commerce | Signup" />
      <BreadCrumb title="Signup" />

      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      id=""
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      id=""
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      name="mobile"
                      placeholder="Mobile Number"
                      id=""
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      id=""
                    />
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
        </div>
      </div>
    </>
  );
};

export default Signup;
