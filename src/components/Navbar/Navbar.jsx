import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";

import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    const value = event.target.value;
    if (value === "inr") {
      setCurrency({ name: "inr", symbol: "₹" });
    } else if (value === "usd") {
      setCurrency({ name: "usd", symbol: "$" });
    } else if (value === "eur") {
      setCurrency({ name: "eur", symbol: "€" });
    } else {
      console.warn("Unsupported currency selected");
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
     
           <img src={logo} alt="Company Logo"
          className="logo" />
      
    </Link>
      <ul>
        <Link to={"/"}> <li>Home</li></Link>
        <li>Feature</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
        </select>
        <button>
          Sign up <img src={arrow_icon} alt="Arrow Icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
