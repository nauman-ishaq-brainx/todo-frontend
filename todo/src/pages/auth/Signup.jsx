import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupUser } from "../../services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function Signup() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            signupUser(data);
            toast.success(
                <>
                    <p className="mb-1"> Account created successfully! Please verify your email.</p>
                </>,
                { autoClose: false }
            );
            setTimeout(() => {
                navigate("/auth/login");
            }, 2000);



            reset();
        } catch (error) {
            toast.error(error.response?.data?.error || "❌ Signup failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Signup</h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

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
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                Signing up...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() => (window.location.href = "/auth/login")}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={4000} />
        </div>
    );
}
