import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 

// 
export const PaginationPageValueSlice = createAsyncThunk("PaginationPageValueSlice", async (body, { rejectWithValue }) => {
    return body;
}
);

export const ToggleEffectOnSearchClickPaginationSlice = createAsyncThunk("ToggleEffectOnSearchClickPaginationSlice", async (body, { rejectWithValue }) => {

    console.log("sndvchsjds",body)
    if(body===true){
        return false
    }
    else if(body=== false){
        return true
    }
    // return body;
}
);





// Reducer

export const TogglesValuesReducer = createSlice({
    name: "TogglesValuesReducer",
    initialState: {
        PaginationPageValueData: 1,
        ToggleEffectOnSearchClickPaginationData:"",
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(PaginationPageValueSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.PaginationPageValueData = (action.payload);
            }
            )
            .addCase(ToggleEffectOnSearchClickPaginationSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.ToggleEffectOnSearchClickPaginationData = (action.payload);
            }
            )


    },

});

export default TogglesValuesReducer.reducer;
