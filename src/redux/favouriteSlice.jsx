import { createSlice } from "@reduxjs/toolkit";

const favourite = JSON.parse(localStorage.getItem('favourites')) || []


const initialState = {
    fav: favourite,
};

const favouritesSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            const image = action.payload;
            if (!state.fav.some((fav) => fav.id === image.id)) {
                state.fav.push(image);
                localStorage.setItem("favourites", JSON.stringify(state.fav));
            }
        },
        deleteFavourite: (state, action) => {
            const deletImg = action.payload;
            state.fav = state.fav.filter((fav) => fav.id !== deletImg);
            localStorage.setItem("favourites", JSON.stringify(state.fav));
        },
        updateDescription: (state, action) => {
            const { id, newDescription } = action.payload;
            state.fav = state.fav.map((fav) =>
                fav.id === id ? { ...fav, alt_description: newDescription } : fav
            );
            localStorage.setItem("favourites", JSON.stringify(state.fav));
        },
    }
});

export const { addFavourite, deleteFavourite, updateDescription } = favouritesSlice.actions;
export default favouritesSlice.reducer