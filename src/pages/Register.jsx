import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues } from "../store";
import Modal from "../components/modal/Modal";
import RegisterModalContent from "../components/modal/modalcontent/RegisterModalContent.jsx";
import useModal from "../components/modal/useModal";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, setLoading, user, setUser } = useVenues();
  const [error, setError] = useState(null);
  const { isVisible, showModal, hideModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please check your details.");
      }

      const result = await response.json();
      setUser(result);
      console.log("Registration successful:", result);
      showModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-start">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("name", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers, and underscores",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud.noroff.no$/,
                  message: "Email must be a valid stud.noroff.no address",
                },
              })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full btn-primary py-2 button-custom px-4 text-white transition duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "button-color"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
            <ArrowForwardIcon />
          </button>
          <Link
            to="/login"
            className="mt-4 hover:underline text-gray-400 text-sm text-start"
          >
            <div className="mt-4">Already have an account? Login</div>
          </Link>
        </form>
      </div>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        <RegisterModalContent hideModal={hideModal} onFinish={hideModal} />
      </Modal>
    </div>
  );
}

export default Register;
