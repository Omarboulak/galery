// GalerySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const imgGalery = createAsyncThunk("gallery/random", async (page) => {
    const response = await fetch(`https://api.unsplash.com/photos/random?count=23&page=${page}&per_page=23&client_id=wpiiT6tN2Rrm_2kKkwi7cT4xAMdPk7Q3KdB1gx4PD5c`);
    return await response.json();
});

export const imgSearch = createAsyncThunk("gallery/search", async ({ query, page }) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?&page=${page}&per_page=23&query=${query}&client_id=wpiiT6tN2Rrm_2kKkwi7cT4xAMdPk7Q3KdB1gx4PD5c`);
    const data = await response.json();
    return { results: data.results, page };
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
                const newImages = action.payload.filter(
                    (img) => !state.images.some((exists) => exists.id === img.id)
                );
                state.images = [...state.images, ...newImages];
                state.loading = false;
            })
            .addCase(imgGalery.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(imgSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(imgSearch.fulfilled, (state, action) => {
                const { results, page } = action.payload;
                const newImages = results.filter(
                    (img) => !state.images.some((exists) => exists.id === img.id)
                );
                state.images = page === 1 ? results : [...state.images, ...newImages];
                state.loading = false;
            })
            .addCase(imgSearch.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export const { resetImages } = galerySlice.actions;
export default galerySlice.reducer;