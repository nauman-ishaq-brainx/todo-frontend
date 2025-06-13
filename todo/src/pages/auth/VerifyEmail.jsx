import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        toast.success('Email successfully verified');

        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.error || "Verification failed.");
      }
    };

    if (token) {
      verify();
    } else {
      toast.error("No token provided.");
    }
  }, [token, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <h2 className="mb-4">Verifying your email...</h2>
        <div className="spinner-border text-primary" role="status" />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
