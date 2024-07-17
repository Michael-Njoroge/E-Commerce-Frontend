import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productService from './productService'

export const getProducts = createAsyncThunk('product/get-products', async(data,thunkApi) => {
	try{
		return await productService.getProducts(data)
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

export const getProduct = createAsyncThunk('product/get-product', async(id,thunkApi) => {
	try{
		 const response = await productService.getProduct(id);
    return response;
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

export const getCart = createAsyncThunk('product/get-cart', async(thunkApi) => {
	try{
		 const response = await productService.getCart();
    return response;
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

export const updateProductQuantity = createAsyncThunk('product/update-quantity', async(data,thunkApi) => {
	try{
		return await productService.updateProductQuantity(data)
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

export const reviewProduct = createAsyncThunk('product/review-product', async(data,thunkApi) => {
	try{
		return await productService.reviewProduct(data)
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
	reducers: {
		reset: (state) => {
	      state.reviewed_product = null;
	      state.isError = false;
	      state.isLoading = false;
	      state.isSuccess = false;
	      state.message = null;
	    },
	},
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
				state.singleProduct = action.payload;
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
			})
			.addCase(getCart.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.userCart = action.payload;
			})
			.addCase(getCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			})
			.addCase(updateProductQuantity.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updateProductQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.updatedCartQuantity = action.payload;
			})
			.addCase(updateProductQuantity.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			})
			.addCase(reviewProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(reviewProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.reviewed_product = action.payload;
				if (state.isSuccess === true) {
		          toast.success("Review submittted successfully");
		        }
			})
			.addCase(reviewProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			});
	}
});

export const {reset} = productSlice.actions
export default productSlice.reducer