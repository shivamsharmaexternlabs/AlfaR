import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
 

// 
export const UserDetilsByIdSlice = createAsyncThunk("UserDetilsByIdSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}user/${body?.user_id}`, {
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


export const UserDetilsPatchByIdSlice = createAsyncThunk("UserDetilsPatchByIdSlice", async (body, { rejectWithValue }) => {

  // console.log("zmndcnvsndmcsd",body)
  try {
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}user/${body?.user_id}`,
      body,
      { 
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







// Reducer

export const userDetailsReducer = createSlice({
  name: "userDetailsReducer",
  initialState: {
    userDetilsByIdData: [],
    userDetilsPatchByIdData: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(UserDetilsByIdSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetilsByIdData = (action.payload);
      }
      )

      .addCase(UserDetilsPatchByIdSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetilsPatchByIdData = (action.payload);
      }
      )



  },

});

export default userDetailsReducer.reducer;
