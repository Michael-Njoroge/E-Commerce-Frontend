import api from '../../utils/axiosInstance';

const getProducts = async() => {
	const response = await api.get('products');
	return response.data.data;
}

const getProduct = async(id) => {
	const response = await api.get(`products/${id}`);
	return response.data.data;
}

const productService = {
	getProducts,
	getProduct,
}

export default productService;