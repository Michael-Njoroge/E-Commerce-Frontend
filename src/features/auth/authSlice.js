import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

export const registerUser = createAsyncThunk('auth/user',
	async (data, thunkApi) => {
		try{
			return await authService.registerUser(data)
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
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
    .builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true ;
      state.message = action.error;
    });
  },
});

export default authSlice.reducer
