import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationSchemas";
import { loginUser } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.userObject));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.error || "Login failed";
      toast.error(errMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer />
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
            {isSubmitting ? (
              <div className="spinner-border spinner-border-sm" role="status" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/auth/signup")}
            >
              Create one
            </button>
          </p>
          <p>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
