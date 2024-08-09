// src/Navigation.jsx
import React from "react";
import './Navigation.css';
import Screen from "./Screen";

function Navigation({ handleLogout }) {
    const handleNavigation = (page) => {
        if (page === "transaction") {
            // Open Screen.jsx in a new tab
            window.open(`/${Screen}`, "_blank");
        } else {
            // Open other pages in a new tab with some content
            window.open(`/${page}`, "_blank");
        }
    };

    return (
        <div className="navigation-container">
            <h1>Microfinance Dashboard</h1>
            <div className="block" onClick={() => handleNavigation("home")}>
                <h2>Home</h2>
            </div>
            <div className="block" onClick={() => handleNavigation("request-loan")}>
                <h2>Request Loan</h2>
            </div>
            <div className="block" onClick={() => handleNavigation("fund-loan")}>
                <h2>Fund Loan</h2>
            </div>
            <div className="block" onClick={() => handleNavigation("repay-loan")}>
                <h2>Repay Loan</h2>
            </div>
            <div className="block" onClick={() => handleNavigation("transaction")}>
                <h2>Transaction</h2>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Navigation;
