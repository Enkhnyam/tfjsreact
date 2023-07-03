import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import '../App.css';

function Layout() {
    return (
        <>
            <Navbar />
            <div className="main">
                <Outlet />
                <p>hello</p>
                <h1>Succc</h1>
            </div>
        </>
    )
}

export default Layout;