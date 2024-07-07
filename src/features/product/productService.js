import api from '../../utils/axiosInstance';

const getProducts = async() => {
	const response = await api.get('products');
	return response.data.data;
}

const getProduct = async(id) => {
	const response = await api.get(`products/${id}`);
	return response.data.data;
}

const addToWishlist = async(prodId) => {
	const response = await api.put('wishlist',{
		product_id: prodId,
	});
	return response.data.data;
}

const productService = {
	getProducts,
	getProduct,
	addToWishlist
}

export default productService;