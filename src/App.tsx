import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Bookmark />} />
        <Route path="/signup" element={<Signup />} />
        {/* add dashboard and profile later */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
