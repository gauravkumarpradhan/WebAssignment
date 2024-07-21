import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createQuote, getQuotes, login, uploadMedia } from "../api";
import { toast } from "react-toastify";

const initialState = {
    token: null,
    quotes: {
        list: [],
        isFetching: false,
    },
};

const appSlice = createSlice({
    name: "appStore",
    initialState,
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload;
        },
        setQuotesList(state, action) {
            state.quotes.list = [...state.quotes.list, ...action.payload];
        },
        setIsFetchingQuotesList(state, action) {
            state.quotes.isFetching = action.payload;
        },
    },
});

export const dispatchLogin = createAsyncThunk(
    "app/login",
    async ({ payload, onSuccess }, { dispatch }) => {
        const response = await login(payload);

        if (response?.data) {
            if (onSuccess) {
                onSuccess();
                toast.success("Login Successfull");
            }
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
                toast.success("Media url successfully fetched");
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
            toast.success("Quote creation successful");
            if (onSuccess) {
                onSuccess();
            }
        }
    }
);

export const fetchQuotesList = createAsyncThunk(
    "app/fetchQuotesList",
    async ({ token, limit, offset }, { dispatch }) => {
        dispatch(setIsFetchingQuotesList(true));
        const response = await getQuotes(token, limit, offset);

        if (response?.data) {
            dispatch(setQuotesList(response?.data));
        }
        dispatch(setIsFetchingQuotesList(false));
    }
);

export const { setUserToken, setQuotesList, setIsFetchingQuotesList } =
    appSlice.actions;

export default appSlice.reducer;
