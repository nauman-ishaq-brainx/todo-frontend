// src/routes/index.js
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import HomeRoutes  from "./home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<HomeRoutes />} />

    </Routes>
  );
}
