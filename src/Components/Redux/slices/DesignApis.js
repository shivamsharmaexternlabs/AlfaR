import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let Token = localStorage.getItem("Token", false)



export const DesignGetSlice = createAsyncThunk("DesignGetSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}design`, {
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


export const FavoriteSlice = createAsyncThunk("FavoriteSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}design/favorite`, body,{
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

export const GetDesignByFilterSlice = createAsyncThunk("GetDesignByFilterSlice", async (body, { rejectWithValue }) => {
    try { 
        

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}design?search=${body?.search==undefined?"":body?.search}&${body?.filter}&page=${body?.page}&limit=6`, {
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

export const GetFavoriteSlice = createAsyncThunk("GetFavoriteSlice", async (body, { rejectWithValue }) => {
    try { 
        

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}design/favorite?page=${body?.page}&limit=6`, {
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



export const DesignApis = createSlice({
    name: "DesignApis",
    initialState: {
        DesignGetData: [],
        FavoriteData:[],
        GetDesignByFilterData:[],
        GetFavoriteData:[],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(DesignGetSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.DesignGetData = (action.payload);
            }
            )

            .addCase(FavoriteSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FavoriteData = (action.payload);
            }
            )

            .addCase(GetDesignByFilterSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.GetDesignByFilterData = (action.payload);
            }
            )

            .addCase(GetFavoriteSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.GetFavoriteData = (action.payload);
            }
            )

    },

});

export default DesignApis.reducer;