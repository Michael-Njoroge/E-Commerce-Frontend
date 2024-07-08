import api from '../../utils/axiosInstance';

const getBlogs = async() => {
	const response = await api.get('blogs');
	return response.data.data;
}

const getBlog = async(id) => {
	const response = await api.get(`blogs/${id}`);
	return response.data.data;
}

const blogService = {
	getBlogs,
	getBlog
}

export default blogService;