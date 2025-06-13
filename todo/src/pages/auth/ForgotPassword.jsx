import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [resetLink, setResetLink] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setResetLink(""); // clear previous link
    try {
      const res = await forgotPassword(email);
      const url = res.resetLink;
      setResetLink(url);
      toast.success("Reset link generated successfully!");
    } catch (error) {
      const errMsg = error.response?.data?.error || "Something went wrong.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>

        {resetLink && (
          <div className="alert alert-success">
            Password reset link:
            <br />
            <a href={resetLink} target="_blank" rel="noopener noreferrer">
              {resetLink}
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
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
