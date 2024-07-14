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

const getMyOrders = async() => {
	const response = await api.get('user-orders');
	return response.data.data;
}

const updateProfile = async(data) => {
	const response = await api.put('users/update',data);
	return response.data.data;
}

const forgotPassword = async(data) => {
	const response = await api.post('users/forgot-password',data);
	return response.data;
}

const resetPassword = async(data) => {
	const response = await api.post('users/reset-password',data);
	return response.data.data;
}

const authService = {
	register,
	login,
	getWishlist,
	addToCart,
	removeProductFromCart,
	applyCoupon,
	getMyOrders,
	updateProfile,
	forgotPassword,
	resetPassword
}

export default authService;