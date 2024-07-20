import React from "react";
import RoutesSection from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <RoutesSection />
        </BrowserRouter>
    );
}

export default App;
