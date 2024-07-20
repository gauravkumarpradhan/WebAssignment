import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LOGIN_PAGE_ROUTE, QUOTE_LISTING_ROUTE } from "./constant";
import Login from "../Components/Login";
import { useSelector } from "react-redux";
import QuoteListingSection from "../Components/QuoteListingSection";

function RoutesSection() {
    const token = useSelector((storeData) => storeData?.appStore?.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(LOGIN_PAGE_ROUTE);
        }
    }, []);

    useEffect(() => {
        if (token) {
            navigate(QUOTE_LISTING_ROUTE);
        }
    }, [token]);

    return (
        <Routes>
            <Route path={LOGIN_PAGE_ROUTE} element={<Login />} />
            <Route
                path={QUOTE_LISTING_ROUTE}
                element={<QuoteListingSection />}
            />
            <Route />
        </Routes>
    );
}

export default RoutesSection;
