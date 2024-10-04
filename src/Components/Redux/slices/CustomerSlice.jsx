import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";




export const GetCustomerDetails = createAsyncThunk("GetCustomerDetails", async (body, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customers`, {
			headers: {
				"Accept": "*/*",
				"Authorization": `Bearer ${body.Token_LS}`
			},
		});

		return response;

	} catch (err) {
		toast.error(err?.response?.data?.message);
		return rejectWithValue(err);
	}
}
);

export const CreateCustomer = createAsyncThunk("CreateCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");
	try {
		const response = await axios.post(`${process.env.REACT_APP_BASE_URL}customer/add`,body, {
			headers: {
				"Accept": "*/*",
				"Authorization": `Bearer ${Token}`
			},
		});

		return response;

	} catch (err) {
		toast.error(err?.response?.data?.message);
		return rejectWithValue(err);
	}
}
);


export const customerSlice = createSlice({
	name: "customerSlice",
	initialState: {
		employeeDetailsData: [],
		createdCustomer:[],
		loading: false,
		error: null,
	},
	reducers: {},


	extraReducers: (builder) => {

		builder

			.addCase(CreateCustomer.pending, (state) => {
				state.loading = true;
			})

			.addCase(CreateCustomer.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.createdCustomer = payload;
			})

			.addCase(CreateCustomer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})



	},

});

export default customerSlice.reducer;