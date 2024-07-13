import api from '../../utils/axiosInstance';

const register = async(userData) => {
	const response = await api.post('auth/user/register',userData);
	if(response.data){
		localStorage.setItem('customer', JSON.stringify(response.data.data));
	}
	return response.data.data;	
}

const login = async(userData) => {
	const response = await api.post('auth/user/login',userData);
	if(response.data){
		localStorage.setItem('customer', JSON.stringify(response.data.data));
	}
	return response.data.data;	
}

const getWishlist = async() => {
	const response = await api.get('wishlist');
	return response.data.data;
}

const addToCart = async(data) => {
	const response = await api.post('products/add-cart',data);
	return response.data.data;
}

const removeProductFromCart = async(data) => {
	const response = await api.post('products/remove-cart',data);
	return response.data.data;
}

const applyCoupon = async(data) => {
	// console.log(data)
	const response = await api.post('cart/apply-coupon',data );
	return response.data.data;
}

const authService = {
	register,
	login,
	getWishlist,
	addToCart,
	removeProductFromCart,
	applyCoupon
}

export default authService;