import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

export const register = createAsyncThunk('auth/user',
	async (data, thunkApi) => {
		try{
			return await authService.register(data)
		}catch(error){
			return thunkApi.rejectWithValue(error);
		}
    },
)

const initialState = {
	user: "",
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user =  null;
        state.message = action.error;
      });
  }
});

export default authSlice.reducer
