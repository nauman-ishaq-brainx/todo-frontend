import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { updatePassword } from "../../services/authServices";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(6, "Minimum 6 characters").required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully. Redirecting to homepage");
      reset();
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Update Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              {...register("currentPassword")}
              className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
            />
            {errors.currentPassword && (
              <div className="invalid-feedback">{errors.currentPassword.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              {...register("newPassword")}
              className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
            />
            {errors.newPassword && (
              <div className="invalid-feedback">{errors.newPassword.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status" />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
}
