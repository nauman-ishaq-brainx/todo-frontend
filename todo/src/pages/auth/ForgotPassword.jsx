import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: {isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword(email);
      toast.success("A reset link has been sent.");
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
