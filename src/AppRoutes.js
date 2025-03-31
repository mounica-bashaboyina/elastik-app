import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import StudentListPage from "./pages/StudentListPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<StudentListPage />} />
    </Routes>
  );
};

export default AppRoutes;