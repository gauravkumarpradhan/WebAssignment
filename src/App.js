import React from "react";
import RoutesSection from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <RoutesSection />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
