import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const CreateEmployees = createAsyncThunk("CreateCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");
	try {
		const response = await axios.post(`${process.env.REACT_APP_BASE_URL}user/invite-signup`, body, {
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


export const GetEmployeeDetails = createAsyncThunk("GetEmployeeDetails", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");

	const queryParams = new URLSearchParams();

	const pageParam = body && body.page !== undefined && body.page !== '' ? `${body.page}` : '1';

	const searchItem = body && body.search !== undefined && body.search !== '' ? `${body.search}` : '';
	const statusItem = body && body.status !== undefined && body.status !== '' ? `${body.status}` : '';

	// Append page parameter

	if (body?.page || body?.search || body?.status) {
		queryParams.append('_page', pageParam);
		queryParams.append('_search', searchItem);
		queryParams.append('status', statusItem);
	} else {

	}
	try {
		const response = await axios.get(`${process.env.REACT_APP_BASE_URL}user${queryParams.toString() ? '?' + queryParams.toString() : ''}`, {
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

export const EditEmployee = createAsyncThunk("EditCustomer", async (body, { rejectWithValue }) => {
	let Token = localStorage.getItem("Token");

	// console.log("bhsdhb", body)
	try {
		const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}user/update/${body?.id}`, body, {
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

	try {
		const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}user/update-status/${body?.id}`, {status:body.status}, {
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

export const employeesSlice = createSlice({
	name: "employeesSlice",
	initialState: {
		employeeDetailsData: [],
		createdEmployee: [],
		updatedEmployee: [],
		updatedStatus:[],
		loading: false,
		error: null,
	},
	reducers: {},


	extraReducers: (builder) => {

		builder
			//ADD CUSTOMERS
			.addCase(CreateEmployees.pending, (state) => {
				state.loading = true;
			})

			.addCase(CreateEmployees.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.createdEmployee = payload;
			})

			.addCase(CreateEmployees.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			//GET CUSTOMERS
			.addCase(GetEmployeeDetails.pending, (state) => {
				state.loading = true;
			})

			.addCase(GetEmployeeDetails.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.employeeDetailsData = payload?.data;
			})

			.addCase(GetEmployeeDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})


			//UPDATE CUSTOMERS
			.addCase(EditEmployee.pending, (state) => {
				state.loading = true;
			})

			.addCase(EditEmployee.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.updatedEmployee = payload;
			})

			.addCase(EditEmployee.rejected, (state, action) => {
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

export default employeesSlice.reducer;