import api from '../../utils/axiosInstance';

const registerUser = async(userData) => {
	const response = await api.post('auth/user/register',userData);
	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data.data));
	}
	return response.data.data;
}


const authService = {
	registerUser,
}

export default authService;