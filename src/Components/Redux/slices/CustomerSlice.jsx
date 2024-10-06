import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const CreateCustomer = createAsyncThunk("CreateCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");
	try {
		const response = await axios.post(`${process.env.REACT_APP_BASE_URL}customer/add`, body, {
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

export const GetCustomerDetails = createAsyncThunk("GetCustomerDetails", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");

	const queryParams = new URLSearchParams();

	const pageParam = body && body.page !== undefined && body.page !== '' ? `${body.page}` : '1';

	const searchItem = body && body.search !== undefined && body.search !== '' ? `${body.search}` : '';

	// Append page parameter

	if (body?.page || body?.search) {
		queryParams.append('_page', pageParam);
		queryParams.append('_search', searchItem);
	} else {
		
	}



	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer${queryParams.toString() ? '?' + queryParams.toString() : ''}`, {
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

export const EditCustomer = createAsyncThunk("EditCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");

	console.log("bhsdhb", body)
	try {
		const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}customer/update/${body?.id}`, body, {
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
		customerDetailsData: [],
		createdCustomer: [],
		updatedCustomer: [],
		loading: false,
		error: null,
	},
	reducers: {},


	extraReducers: (builder) => {

		builder
			//ADD CUSTOMERS
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

			//GET CUSTOMERS
			.addCase(GetCustomerDetails.pending, (state) => {
				state.loading = true;
			})

			.addCase(GetCustomerDetails.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.customerDetailsData = payload?.data;
			})

			.addCase(GetCustomerDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})


			//UPDATE CUSTOMERS
			.addCase(EditCustomer.pending, (state) => {
				state.loading = true;
			})

			.addCase(EditCustomer.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.updatedCustomer = payload;
			})

			.addCase(EditCustomer.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})



	},

});

export default customerSlice.reducer;