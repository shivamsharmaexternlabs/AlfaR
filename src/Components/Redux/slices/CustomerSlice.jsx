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
		// toast.error(err?.response?.data?.message);
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
});

export const EditCustomer = createAsyncThunk("EditCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");

	// console.log("bhsdhb", body)
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


// GET DAY END BALANCE
export const GetDayEndBalance = createAsyncThunk("GetDayEndBalance", async (body, { rejectWithValue }) => {
	
	let Token = localStorage.getItem("Token");
	// console.log('.........................',Token)

	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/get-day-end-balance?customerId=${body?.customerId}`, {
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


// GET RAW DATA
export const GetRawData = createAsyncThunk("GetRawData", async (body, { rejectWithValue }) => {
	
	let Token = localStorage.getItem("Token");
	// console.log('.........................',Token)

	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/get-summary-report-raw?customerId=${body?.customerId}`, {
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


// GET SUMMARY REPORT
export const GetSummaryReport = createAsyncThunk("GetSummaryReport", async (body, { rejectWithValue }) => {
	
	let Token = localStorage.getItem("Token");
	// console.log('.........................',Token)

	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/get-summary-report?customerId=${body?.customerId}`, {
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

export const RefreshDayBalance = createAsyncThunk("refreshDayBalance", async (body, { rejectWithValue }) => {
	
	let Token = localStorage.getItem("Token");
	// console.log('.........................',Token)

	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}customer/update-day-end-balance?customerId=${body?.customerId}`, {
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

export const UpdateStatus = createAsyncThunk("updateStatus", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");
	console.log('UpdateStatusUpdateStatus',{Token , body})

	try {
		const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}customer/update-status/?status=${body.status}&id=${body?.id}`,body, {
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
		dayEndBalanceData:[],
		updatedStatus:[],
		rawData:[],
		summaryReportData:[],
		refreshDayBalanceData:[],
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

			//DAY END BALANCE
			.addCase(GetDayEndBalance.pending, (state) => {
				state.loading = true;
			})

			.addCase(GetDayEndBalance.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.dayEndBalanceData = payload?.data;
			})

			.addCase(GetDayEndBalance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Raw Data
			.addCase(GetRawData.pending, (state) => {
				state.loading = true;
			})

			.addCase(GetRawData.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.rawData = payload?.data;
			})

			.addCase(GetRawData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			//  Summary Report
			.addCase(GetSummaryReport.pending, (state) => {
				state.loading = true;
			})

			.addCase(GetSummaryReport.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.summaryReportData = payload?.data;
			})

			.addCase(GetSummaryReport.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			//  Summary Report
			.addCase(RefreshDayBalance.pending, (state) => {
				state.loading = true;
			})

			.addCase(RefreshDayBalance.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.refreshDayBalanceData = payload?.data;
			})

			.addCase(RefreshDayBalance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			//UPDATE STATUS
			.addCase(UpdateStatus.pending, (state) => {
				state.loading = false;
			})

			.addCase(UpdateStatus.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.updatedStatus = payload;
			})

			.addCase(UpdateStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})



	},

});

export default customerSlice.reducer;