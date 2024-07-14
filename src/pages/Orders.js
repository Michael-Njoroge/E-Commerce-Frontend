import React, {useEffect} from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { getMyOrders } from '../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux'

const Component = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.myOrders);
  console.log("orderState",orderState);

  useEffect(() => {
     dispatch(getMyOrders());
  }, []);

    return (
    	<>
		    <Meta title="E-Commerce | My Orders" />
		    <BreadCrumb title="My Orders" />
	        <Container class1="cart-wrapper home-wrapper-2 py-5">
	        	<div className="row">
            		<div className="col-12">
            			<div className="row">
            				<div className="col-3">
            					<h5># SNO</h5>
            				</div>
            				<div className="col-3">
            					<h5>Total Amount</h5>
            				</div>
            				<div className="col-3">
            					<h5>Total Amount After Discount</h5>
            				</div>
            				<div className="col-3">
            					<h5>Status</h5>
            				</div>
            			</div>
            			<div className="col-12 mt-3">
	            			{
	            				orderState && orderState?.map((item, index) => {
	            					return(
		            					<div key={index} className="row pt-2 my-3" style={{backgroundColor:"#febd69"}}>
				            				<div className="col-3">
				            					<p>{index + 1}</p>
				            				</div>
				            				<div className="col-3">
				            					<p>{item?.total_price}</p>
				            				</div>
				            				<div className="col-3">
				            					<p>{item?.total_price_after}</p>
				            				</div>
				            				<div className="col-3">
				            					<p>{item?.order_status}</p>
				            				</div>
				            				<div className="col-12">
						            			<div className="row pt-3" style={{backgroundColor:"#232f3e"}}>
						            				<div className="col-3">
						            					<h6 className="text-white">Product Name</h6>
						            				</div>
						            				<div className="col-3">
						            					<h6 className="text-white">Quantity</h6>
						            				</div>
						            				<div className="col-3">
						            					<h6 className="text-white">Price</h6>
						            				</div>
						            				<div className="col-3">
						            					<h6 className="text-white">Color</h6>
						            				</div>
						            				<div className="col-12">
								            			{
								            				item?.items.map((product,index) => {
								            					return (
								            						<div key={index} className="row py-3">
											            				<div className="col-3">
											            					<p className="text-white">{product?.product?.title}</p>
											            				</div>
											            				<div className="col-3">
											            					<p className="text-white">{product?.quantity}</p>
											            				</div>
											            				<div className="col-3">
											            					<p className="text-white">{product?.price}</p>
											            				</div>
											            				<div className="col-3">
											            					<p>
											            						<ul className="colors ps-0">
												                                  <li style={{backgroundColor:product?.color?.title}}></li>
												                                </ul>
											            					</p>
											            				</div>
											            			</div>
											            		)
								            				})
								            			}
						            				</div>
						            			</div>
				            				</div>
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

export default Component;
