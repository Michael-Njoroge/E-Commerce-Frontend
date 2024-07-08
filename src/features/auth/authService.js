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

const authService = {
	register,
	login,
	getWishlist
}

export default authService;