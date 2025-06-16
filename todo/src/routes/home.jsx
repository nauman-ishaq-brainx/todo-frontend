import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/dashboard/Home";

export default function HomeRoutes() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}