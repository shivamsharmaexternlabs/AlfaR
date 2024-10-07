import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

let Token = localStorage.getItem("Token", false)


export const FabricNameSlice = createAsyncThunk("FabricNameSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}fabric/name?search=${body.search}&page=${body?.page}&limit=${body?.limit}`, {
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${Token}`
            },
        });
        

        // console.log("mbnfdff",response)
        return response;

    } catch (err) {
        toast.error(err?.response?.data?.message);
        return rejectWithValue(err);
    }
}
);

export const FabricTextureSlice = createAsyncThunk("FabricTextureSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}fabric/texture?search=${body.search}&page=${body?.page}&limit=${body?.limit}`, {
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



export const FabricThicknessSlice = createAsyncThunk("FabricThicknessSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}fabric/thickness?search=${body.search}&page=${body?.page}&limit=${body?.limit}`, {
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

export const FabricPrintsSlice = createAsyncThunk("FabricPrintsSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}fabric/prints?search=${body.search}&page=${body?.page}&limit=${body?.limit}`, {
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

export const FabricColorsSlice = createAsyncThunk("FabricColorsSlice", async (body, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}fabric/colors?search=${body.search}&page=${body?.page}&limit=${body?.limit}`, {
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

export const CreateOrderSlice = createAsyncThunk("CreateOrderSlice", async (body, { rejectWithValue }) => {

    let formData = new FormData(); 
    Object.entries(body).map(([key, value]) => {
        formData.append(key, value);   
    })

    // console.log("sghcdhsd",formData)
    // {
    //     "brand": "rebock",
    //     "quantity": "2",
    //     "name": "sam",
    //     "phoneNumber": "9898779979",
    //     "countryCode": "98",
    //     "fabric": "Silk",
    //     "texture": "Smooth",
    //     "thickness": "Super thick",
    //     "print": "Striped",
    //     "color": "Mustard",
    //     "agreementImageUrl": {},
    //     "uploadFile": {}
    // }
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}order`, formData,{
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

export const OrderApis = createSlice({
    name: "OrderApis",
    initialState: {
        FabricNameData: [],
        FabricTextureData: [],
        FabricThicknessData: [],
        FabricPrintsData: [],
        FabricColorsData:[],
        CreateOrderData:[],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(FabricNameSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FabricNameData = (action.payload);
            }
            )
            .addCase(FabricTextureSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FabricTextureData = (action.payload);
            }
            )
            .addCase(FabricThicknessSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FabricThicknessData = (action.payload);
            }
            )

            .addCase(FabricPrintsSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FabricPrintsData = (action.payload);
            }
            )


            .addCase(FabricColorsSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.FabricColorsData = (action.payload);
            }
            )

            .addCase(CreateOrderSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.CreateOrderData = (action.payload);
            }
            )



    },

});

export default OrderApis.reducer;