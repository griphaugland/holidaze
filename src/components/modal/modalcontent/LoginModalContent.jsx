import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues, useGeneral } from "../../../store";
import useCreateApiKey from "../../hooks/useCreateApiKey";
import useModal from "../useModal";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, setLoading, user, setUser, login, isLoggedIn } =
    useGeneral();
  const [error, setError] = useState(null);
  const { hideModal } = useModal();
  const navigate = useNavigate();

  const { createApiKey, error: apiKeyError } = useCreateApiKey();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const result = await response.json();
      console.log("Login result:", result);
      setUser(result);
      const storage = JSON.parse(localStorage.getItem("storage")) || {};
      storage.user = result;
      localStorage.setItem("storage", JSON.stringify(storage));

      if (result && result.data && result.data.accessToken) {
        await createApiKey(result.data.accessToken);
      } else {
        throw new Error("Invalid user data received from login response");
      }
      login();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded w-screen max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-start">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {apiKeyError && (
            <p className="text-red-500 text-sm mb-4">{apiKeyError}</p>
          )}
          <button
            type="submit"
            name="login"
            className={`w-full btn-primary py-2 button-custom px-4 text-white transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "button-color"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
            <ArrowForwardIcon />
          </button>
          <Link
            name="register-link"
            to="/register?redirect=login"
            className="text-gray-400 hover:underline text-sm text-start"
          >
            <div className="mt-4">No account? Register</div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
