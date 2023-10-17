import React from "react";
import Home from "./pages/Home";
import Table from "./pages/Table";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Table />} />
      </Routes>
    </>
  );
};

export default App;
