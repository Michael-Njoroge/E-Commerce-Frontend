import api from '../../utils/axiosInstance';

const register = async(userData) => {
	const response = await api.post('auth/user/register',userData);
	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data.data));
	}
	return response.data.data;
}

const login = async(userData) => {
	const response = await api.post('auth/user/login',userData);
	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data.data));
	}
	return response.data.data;
}

const authService = {
	register,
	login
}

export default authService;