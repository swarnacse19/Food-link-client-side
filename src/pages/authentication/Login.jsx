import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user.uid);
        toast.success("Login Successfully!");
        setTimeout(
          () => navigate(`${location.state ? location.state : "/"}`),
          3000
        );
      })
      .catch((error) => {
        console.log(error.message);
        if (error.code === "auth/invalid-credential") {
          setError("root", {
            type: "manual",
            message: "Email or password is incorrect.",
          });
        }
      });
  };

  return (
    <div className="text-black font-medium mx-auto">
      <h1 className="text-3xl font-bold mt-6">Welcome Back</h1>
      <p className="mt-2 mb-4">Login Here</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* Email Field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "This email field is required" })}
            className="input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "This password field is required",
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Global Login Error */}
          {errors.root && (
            <p className="text-red-500">{errors.root.message}</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-[#FF8C42] w-[320px]">Login</button>
        </fieldset>
      </form>

      <p className="font-semibold mt-5 text-gray-400">
        Don't have an account?{" "}
        <Link state={location.state} to="/register" className="text-[#FF8C42]">
          Register
        </Link>
      </p>
      <SocialLogin />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default Login;
