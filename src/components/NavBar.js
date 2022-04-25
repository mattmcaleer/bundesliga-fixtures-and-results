import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/fixtures" className="navLink">FIXTURES</NavLink>
            <NavLink to="/table" className="navLink">LEAGUE TABLE</NavLink>
            <NavLink to="/clubs" className="navLink">CLUBS</NavLink>
        </div>
    )
}

export default NavBar;