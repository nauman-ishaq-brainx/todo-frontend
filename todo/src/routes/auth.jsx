// src/routes/auth.jsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import UpdatePassword from "../pages/auth/UpdatePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";




export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="verify-email/:token" element={<VerifyEmail />} />
      <Route path="forgot-password/" element={<ForgotPassword />} />
      <Route
        path="update-password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
