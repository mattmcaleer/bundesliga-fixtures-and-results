import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <NavLink to="bundesliga-fixtures-and-results/fixtures" className="navLink">FIXTURES</NavLink>
      <NavLink to="bundesliga-fixtures-and-results/table" className="navLink">LEAGUE TABLE</NavLink>
    </div>
  )
}

export default NavBar;