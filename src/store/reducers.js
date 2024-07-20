import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api";

const initialState = {
    token: null,
};

const appSlice = createSlice({
    name: "appStore",
    initialState,
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const dispatchLogin = createAsyncThunk(
    "app/login",
    async (payload, { dispatch }) => {
        const response = await login(payload);
        if (response) {
            dispatch(setUserToken(response));
        }
    }
);

export const { setUserToken } = appSlice.actions;

export default appSlice.reducer;
