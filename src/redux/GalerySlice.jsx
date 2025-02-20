import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const imgGalery = createAsyncThunk("ramdom/imgGalery", async (query) => {
    let response;

    if (query) {
        response = await fetch(`https://api.unsplash.com/search/photos?page=3&query=${query}&client_id=wpiiT6tN2Rrm_2kKkwi7cT4xAMdPk7Q3KdB1gx4PD5c`);
    } else {
        response = await fetch(`https://api.unsplash.com/photos/random?count=20&client_id=wpiiT6tN2Rrm_2kKkwi7cT4xAMdPk7Q3KdB1gx4PD5c`);
    }

    const data = await response.json();
    return query ? data.results : data; 
});


const initialState = {
    images: [], 
    loading: false,
    error: null,
};

const galerySlice = createSlice({
    name: "galery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(imgGalery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(imgGalery.fulfilled, (state, action) => {
                state.images = action.payload;
                state.loading = false;
            })
            .addCase(imgGalery.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});


export default galerySlice.reducer;
