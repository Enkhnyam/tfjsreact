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
            </div>
        </>
    )
}

export default Layout;