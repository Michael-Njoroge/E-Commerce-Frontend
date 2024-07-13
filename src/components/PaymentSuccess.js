import React from 'react';
import check from '../images/Yes_Check_Circle.png'
import { Link } from 'react-router-dom';

const PaymentSuccess = ({ successMessage }) => {
  return (
    <div className="home-wrapper-2 py-4 text-center d-flex align-items-center justify-content-center">
        <div className="filter-card col-6 ">
          <img src={check} alt="Success Tick" className="tick-img" />
          <h1 className="text-center">Thank you for making payment</h1>
          <h3 className="text-center mt-3">{successMessage}</h3>
          <Link to="/product" className="button mt-4 border-0 ">Continue Shopping</Link>
        </div>
    </div>
  );
};

export default PaymentSuccess;
