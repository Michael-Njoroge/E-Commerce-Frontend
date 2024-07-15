import api from '../../utils/axiosInstance';

const getProducts = async() => {
	const response = await api.get('products');
	return response.data.data;
}

const getProduct = async(id) => {
	const response = await api.get(`products/${id}`);
	return response.data.data;
}

const getCart = async() => {
	const response = await api.get('user-cart');
	return response.data.data;
}

const addToWishlist = async(prodId) => {
	const response = await api.put('wishlist',{
		product_id: prodId,
	});
	return response.data.data;
}

const updateProductQuantity = async(data) => {
	const response = await api.post('products/update/cart/quantity',data);
	return response.data.data;
}

const reviewProduct = async(data) => {
	const response = await api.put('products/rate',data);
	return response.data.data;
}

const productService = {
	getProducts,
	getProduct,
	addToWishlist,
	getCart,
	updateProductQuantity,
	reviewProduct
}

export default productService;