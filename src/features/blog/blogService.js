import api from '../../utils/axiosInstance';

const getBlogs = async() => {
	const response = await api.get('blogs');
	return response.data.data;
}

const blogService = {
	getBlogs
}

export default blogService;