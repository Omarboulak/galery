import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    imgages: [],
    loading: false,
    erorr: null
}

const galerySlice = createSlice({
    name: 'galery',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(images.pending, (state) =>{
            state.loading = true;
        })

        .addCase(images.fulfilled, (state, action) => {
            state.images = action.payload;
            state.loading = false
        })

        .addCase(images.rejected, (state, action) => {
            state.error = action.error.message; 
            state.loading = false;
        })
    }
})


