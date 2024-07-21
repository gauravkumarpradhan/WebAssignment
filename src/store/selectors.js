import { createSelector } from "@reduxjs/toolkit";

const selectAppStore = (store) => store.appStore;

export const userTokenSelector = createSelector(
    selectAppStore,
    (appStore) => appStore?.token
);

export const quoteListSelector = createSelector(
    selectAppStore,
    (appStore) => appStore?.quotes?.list
);

export const isFetchingQuotesListSelector = createSelector(
    selectAppStore,
    (appStore) => appStore?.quotes?.isFetching
);
