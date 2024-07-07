import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService'

export const getProducts = createAsyncThunk('product/get-products', async(thunkApi) => {
	try{
		return await productService.getProducts()
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

export const getProduct = createAsyncThunk('product/get-product', async(id,thunkApi) => {
	try{
		return await productService.getProduct(id)
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

export const addToWishlist = createAsyncThunk('product/wishlist', async(id,thunkApi) => {
	try{
		return await productService.addToWishlist(id)
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

const initialState = {
	products: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message : "",
}

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			})
			.addCase(getProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.productToUpdate = action.payload;
			})
			.addCase(getProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			})
			.addCase(addToWishlist.pending, (state) => {
				state.isLoading = true
			})
			.addCase(addToWishlist.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.addToWishlist = action.payload;
				state.message =  "Product added to wishlist successfully!";
			})
			.addCase(addToWishlist.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			});
	}
});

export default productSlice.reducer