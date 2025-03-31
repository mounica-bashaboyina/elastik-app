import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentTable from "./pages/StudentTable";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<StudentTable />} />
    </Routes>
  );
};

export default AppRoutes;