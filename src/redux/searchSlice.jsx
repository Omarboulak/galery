import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchImg = createAsyncThunk("unsplash/searchImg", async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=office&client_id=wpiiT6tN2Rrm_2kKkwi7cT4xAMdPk7Q3KdB1gx4PD5c`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
});

const initialState = {
    imgSearch: [], 
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchImg.pending, (state) => {    
                state.loading = true;
                state.error = null;
            })
            .addCase(searchImg.fulfilled, (state, action) => {
                state.imgSearch = action.payload;
                state.loading = false;
            })
            .addCase(searchImg.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default searchSlice.reducer;
