import React from "react";
import { Link } from "react-router-dom";
// import '../styles/Header.css';
import logo from "../assets/logo.svg";

function Header() {
  return (
    <header>
      <img src={logo} alt="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
