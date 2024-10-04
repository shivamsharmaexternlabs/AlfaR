import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
 

// SignUp
export const SignUpSlice = createAsyncThunk("SignUpSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/signup`, body,);



    toast.success(response?.data?.message);


    return response;

  } catch (err) {



    toast.error(err?.response?.data?.message);



    return rejectWithValue(err);
  }
}
);

// SignIn
export const SignInSlice = createAsyncThunk("SignInSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/signin`, body,);
     localStorage.setItem("Token", response?.data?.token);
    localStorage.setItem("UserId", response?.data?.data?.userId);
    toast.success(response?.data?.message);
    console.log("dhvjsfjsdf",response)

    return response;

  } catch (err) {

    console.log("dhvjsfjsdf",err)

    toast.error(err?.response?.data?.error?.[0]);



    return rejectWithValue(err);
  }
}
);

export const forgetPasswordSlice = createAsyncThunk("forgetPasswordSlice", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/forgot-password`, body,);



    toast.success(response?.data?.message);


    return response;

  } catch (err) {

 
    toast.error(err?.response?.data?.message);



    return rejectWithValue(err);
  }
}
);


//varification code

export const VarificationCode = createAsyncThunk("VarificationCode", async (body, { rejectWithValue }) => {
 
   try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/verify-otp`,body,{
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      },
    });

    console.log("mghvdchjsdsd---",response)
    toast.success(response?.data?.message);


    return response;

  } catch (err) {
  

    console.log("mghvdchjsdsd",err)


    toast.error(err?.response?.data?.message);



    return rejectWithValue(err);
  }
}
);


export const ResetPasswordSlice = createAsyncThunk("ResetPasswordSlice", async (body, { rejectWithValue }) => {

   try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/reset-password/`, body?.values,{
      headers: {
        "Accept": "*/*",
        "Authorization": `Bearer ${body.Token}`
      },
    });


    toast.success(response?.data?.message);


    return response;

  } catch (err) {



    toast.error(err?.response?.data?.error?.[0]);



    return rejectWithValue(err);
  }
}
);




// Reducer

export const signInReducer = createSlice({
  name: "signInReducer",
  initialState: {
    signInData: [],
    signUpData: [],
    forgetPasswordData:[],
    VarificationCodeData:[],
    loading: false,
    error: null,
    ResetPasswordData: []
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      //   .addCase(ResetPasswordSlice.fulfilled, (state, action) => {
      //     state.ResetPasswordData = (action.payload);
      //   }
      //   )


      .addCase(SignUpSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpData = (action.payload);
      }
      )


      .addCase(SignInSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(SignInSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.signInData = (action.payload);
      }
      )

      .addCase(SignInSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })


      .addCase(forgetPasswordSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetPasswordData = (action.payload);
      }
      )

      .addCase(VarificationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.VarificationCodeData = (action.payload);
      }
      )
       








  },

});

export default signInReducer.reducer;
