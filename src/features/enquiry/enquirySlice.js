import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enquiryService from './enquiryService'

export const postEnquiry = createAsyncThunk('enquiry/post-enquiry', async(data, thunkApi) => {
	try{
		return await enquiryService.postEnquiry(data)
	}catch(error){
		return thunkApi.rejectWithValue(error);
	}
});

const initialState = {
	contact: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message : "",
}

export const enquirySlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		reset: (state) => {
			state.createdEnquiry = null;
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postEnquiry.pending, (state) => {
				state.isLoading = true
			})
			.addCase(postEnquiry.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.contact = action.payload;
			})
			.addCase(postEnquiry.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message =  action.error;
			});
	}
});

export const {reset} = enquirySlice.actions;
export default enquirySlice.reducer