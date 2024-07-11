import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'
import { toast } from 'react-toastify';

export const register = createAsyncThunk('register/user',async (data, thunkApi) => {
		try{
			return await authService.register(data)
		}catch(error){
			return thunkApi.rejectWithValue(error);
		}
  },
)

export const login = createAsyncThunk('login/user',async (data, thunkApi) => {
    try{
      return await authService.login(data)
    }catch(error){
      return thunkApi.rejectWithValue(error);
    }
  },
)

export const getWishlist = createAsyncThunk('product/get-wishlist', async(thunkApi) => {
  try{
    return await authService.getWishlist()
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk('product/add-cart', async(data,thunkApi) => {
  try{
    return await authService.addToCart(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const removeProductFromCart = createAsyncThunk('product/remove-cart', async(data,thunkApi) => {
  try{
    return await authService.removeProductFromCart(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const createOrder = createAsyncThunk('product/create-order', async(data,thunkApi) => {
  try{
    return await authService.createOrder(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

const customer = localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null;

const initialState = {
	user: customer,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.createdUser = null;
      state.removedProduct = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
    extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if(state.isSuccess === true){
           localStorage.setItem('token', action.payload.token);
           toast.info("Account created successfully");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isSuccess === true){
           toast.error(action.error);
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if(state.isSuccess === true){
           localStorage.setItem('token', action.payload.token);
           toast.info("Welcome back");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      })
      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.get_wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.add_cart = action.payload;
        if(state.isSuccess === true){
           toast.success("Product added to cart");
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.removedProduct = action.payload;
           toast.success("Product removed from cart");
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      })
       .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
           toast.success("Order created successfully");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      });
  }
});

export const {reset} = authSlice.actions
export default authSlice.reducer
