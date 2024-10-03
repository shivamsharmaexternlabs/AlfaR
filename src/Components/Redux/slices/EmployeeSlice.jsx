import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";



export const GetEmployeeDetails = createAsyncThunk("GetEmployeeDetails", async (body, { rejectWithValue }) => {
	try {
	  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}employee`, {
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


export const employeesSlice = createSlice({
	name: "employeesSlice",
	initialState: {
		employeeDetailsData: [],
		loading: false,
		error: null,
	},
	reducers: {},

	
	extraReducers: (builder) => {

		//   builder

		// .addCase(UserDetilsByIdSlice.fulfilled, (state, action) => {
		//   state.loading = false;
		//   state.userDetilsByIdData = (action.payload);
		// }
		// )

		// .addCase(UserDetilsPatchByIdSlice.fulfilled, (state, action) => {
		//   state.loading = false;
		//   state.userDetilsPatchByIdData = (action.payload);
		// }
		// )



	},

});

export default employeesSlice.reducer;