import React from "react";
import "../App.css";

function About() {
  return (
    <div style={{ backgroundColor: "white", textAlign: "center" }}>
      <br />
      <h2>About</h2>
      <br />
      <br />
      <div
        style={{
          padding: "20px",
          backgroundColor: "grey",
          color: "white",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h4>Who built this website?</h4>
        <div style={{ fontSize: "20px" }}>Me!</div>
        <br />
        <h4>How to connect with me?</h4>
        <div style={{ fontSize: "20px" }}>
          Go outside and call my name really loud, if im close enough i will
          come!
        </div>
        <br />
        <h4>Wonder if I have a Youtube channel?</h4>
        <div style={{ fontSize: "20px" }}>I don´t</div>
      </div>
      <br />
    </div>
  );
}

export default About;
