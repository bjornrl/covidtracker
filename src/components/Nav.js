import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link
        style={{
          color: "white",
          textDecoration: "none",
          marginTop: "10px",
          marginRight: "40px",
        }}
        to="/"
      >
        <li>Home</li>
      </Link>
      <Link
        style={{
          color: "white",
          textDecoration: "none",
          marginTop: "10px",
          marginRight: "40px",
        }}
        to="/symptom"
      >
        <li>Symptom</li>
      </Link>
      <Link
        style={{
          color: "white",
          textDecoration: "none",
          marginTop: "10px",
          marginRight: "40px",
        }}
        to="/graph"
      >
        <li>Graph</li>
      </Link>
      <Link
        style={{
          color: "white",
          textDecoration: "none",
          marginTop: "10px",
          marginRight: "40px",
        }}
        to="/about"
      >
        <li>About</li>
      </Link>
    </nav>
  );
}

export default Nav;
