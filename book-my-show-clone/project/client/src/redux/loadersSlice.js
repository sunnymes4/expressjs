import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        loadingState: false
    },
    reducers: {
        showLoading: (state) => {
            state.loadingState = true
        },

        hideLoading: (state) => {
            state.loadingState = false
        }
    }
});

export const {showLoading, hideLoading} = loaderSlice.actions;

export default loaderSlice.reducer;