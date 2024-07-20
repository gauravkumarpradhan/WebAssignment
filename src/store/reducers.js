import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuote, getQuotes, login, uploadMedia } from "../api";

const initialState = {
    token: null,
    quotesList: [],
};

const appSlice = createSlice({
    name: "appStore",
    initialState,
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload;
        },
        setQuotesList(state, action) {
            state.quotesList = action.payload;
        },
    },
});

export const dispatchLogin = createAsyncThunk(
    "app/login",
    async (payload, { dispatch }) => {
        const response = await login(payload);

        if (response?.data) {
            dispatch(setUserToken(response?.data?.token));
        }
    }
);

export const fetchMediaUrl = createAsyncThunk(
    "app/FetchMediaUrl",
    async ({ payload, onSuccess }, { dispatch }) => {
        const response = await uploadMedia(payload);

        if (response?.data) {
            if (onSuccess) {
                onSuccess(response?.data);
            }
        }
    }
);

export const dispatchCreateNewQuote = createAsyncThunk(
    "app/createNewQuote",
    async ({ token, payload, onSuccess }, { dispatch }) => {
        const response = await createQuote(token, payload);

        if (response?.data) {
            if (onSuccess) {
                onSuccess();
            }
            console.log("File created");
        }
    }
);

export const fetchQuotesList = createAsyncThunk(
    "app/fetchQuotesList",
    async ({ token, limit, offset }, { dispatch }) => {
        const response = await getQuotes(token, limit, offset);

        if (response?.data) {
            dispatch(setQuotesList(response?.data));
        }
    }
);

export const { setUserToken, setQuotesList } = appSlice.actions;

export default appSlice.reducer;
