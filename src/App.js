import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Graph from "./pages/Graph";
import Symptom from "./pages/Symptom";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/symptom" element={<Symptom />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
