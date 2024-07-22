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

export const applyCoupon = createAsyncThunk('cart/apply-coupon', async(data,thunkApi) => {
  try{
    return await authService.applyCoupon(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const getMyOrders = createAsyncThunk('orders/get-orders', async(thunkApi) => {
  try{
    return await authService.getMyOrders()
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const updateProfile = createAsyncThunk('users/update-profile', async(data,thunkApi) => {
  try{
    return await authService.updateProfile(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const forgotPassword = createAsyncThunk('users/forgot-password', async(data,thunkApi) => {
  try{
    return await authService.forgotPassword(data)
  }catch(error){
    return thunkApi.rejectWithValue(error);
  }
});

export const resetPassword = createAsyncThunk('users/reset-password', async(data,thunkApi) => {
  try{
    return await authService.resetPassword(data)
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
      state.updatedUser = null;
      state.removedProduct = null;
      state.forgot_password = null;
      state.reset_password = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = null;
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
           toast.info("Account created successfully");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;

        if (state.isError) {
          const errors = action.payload.response.data.errors;
          let errorMessage = '';

          // Function to accumulate messages
          const accumulateMessages = (messages) => {
            let accumulatedMessage = '';
            messages.forEach((msg) => {
              accumulatedMessage += `${msg}\n`;
            });
            return accumulatedMessage;
          };

          for (const [, messages] of Object.entries(errors)) {
            errorMessage += accumulateMessages(messages);
          }

          state.message = errorMessage.trim();
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
          toast.success("Welcome back");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        if (state.isError === true) {
          state.message = action.payload.response.data.message;
        }
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
        state.message = action.error;
      })
       .addCase(applyCoupon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discount = action.payload;
        if (state.isSuccess === true) {
          toast.success("Discount applied successfully");
        }
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Provide valid coupon");
        }
      })
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;

        const currentUserData = JSON.parse(localStorage.getItem("customer"));
        const newUserData = {
          id: currentUserData?.id,
          token: currentUserData?.token,
          firstname: action?.payload?.firstname,
          lastname: action?.payload?.lastname,
          email: action?.payload?.email,
          mobile: action?.payload?.mobile,
        }
        localStorage.setItem("customer", JSON.stringify(newUserData))
        state.user = action.payload;
        toast.success("Profile updated successfully");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Failed to update");
        }
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.forgot_password = action?.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reset_password = action?.payload?.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          state.message = "Invalid or expired link, please provide a valid link";
        }
      });
  }
});

export const {reset} = authSlice.actions
export default authSlice.reducer
