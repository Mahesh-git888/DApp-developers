// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Navigation from "./Navigation";
import Screen from "./Screen";
import './index.css'; // Optional, for global styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Navigation />} />
            <Route path="/request-loan" element={<Navigation />} />
            <Route path="/fund-loan" element={<Navigation />} />
            <Route path="/repay-loan" element={<Navigation />} />
            <Route path="/transaction" element={<Screen />} />
        </Routes>
    </Router>
);
