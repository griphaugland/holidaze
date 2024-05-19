import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useVenues } from "../../../store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function RegisterModalContent({ hideModal, onFinish }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const { loading, setLoading, user } = useVenues();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Make the API request to update the user profile with additional info
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile. Please check your details.");
      }

      const result = await response.json();
      console.log("Profile update successful:", result);
      onFinish();
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {currentStep === 1 && (
        <form onSubmit={handleSubmit(() => setCurrentStep(2))}>
          <h3 className="text-xl font-bold mb-4">Profile Picture and Banner</h3>
          <div className="mb-4">
            <label
              htmlFor="avatarUrl"
              className="block text-gray-700 font-semibold mb-2"
            >
              Avatar URL:
            </label>
            <input
              type="url"
              id="avatarUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("avatar.url", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Avatar URL must be valid",
                },
              })}
            />
            {errors.avatar && errors.avatar.url && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avatar.url.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="avatarAlt"
              className="block text-gray-700 font-semibold mb-2"
            >
              Avatar Alt Text:
            </label>
            <input
              type="text"
              id="avatarAlt"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("avatar.alt", {
                maxLength: {
                  value: 120,
                  message: "Avatar alt text must be less than 120 characters",
                },
                validate: (value) =>
                  !!value === !!watch("avatar.url") || "Avatar URL is required",
              })}
            />
            {errors.avatar && errors.avatar.alt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avatar.alt.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="bannerUrl"
              className="block text-gray-700 font-semibold mb-2"
            >
              Banner URL:
            </label>
            <input
              type="url"
              id="bannerUrl"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("banner.url", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Banner URL must be valid",
                },
              })}
            />
            {errors.banner && errors.banner.url && (
              <p className="text-red-500 text-sm mt-1">
                {errors.banner.url.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="bannerAlt"
              className="block text-gray-700 font-semibold mb-2"
            >
              Banner Alt Text:
            </label>
            <input
              type="text"
              id="bannerAlt"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              {...register("banner.alt", {
                maxLength: {
                  value: 120,
                  message: "Banner alt text must be less than 120 characters",
                },
                validate: (value) =>
                  !!value === !!watch("banner.url") || "Banner URL is required",
              })}
            />
            {errors.banner && errors.banner.alt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.banner.alt.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary text-sm flex items-center justify-center w-full py-2 px-4 mt-4"
          >
            Next
            <ArrowForwardIcon className="ml-2" />
          </button>
        </form>
      )}

      {currentStep === 2 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-bold mb-4">Venue Manager</h3>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="venueManager"
              className="mr-2"
              {...register("venueManager")}
            />
            <label
              htmlFor="venueManager"
              className="text-gray-700 font-semibold"
            >
              Do you plan to list venues?
            </label>
          </div>
          <button
            type="submit"
            className={`btn-primary text-sm flex items-center justify-center w-full py-2 px-4 mt-4 ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
            <ArrowForwardIcon className="ml-2" />
          </button>
        </form>
      )}
    </div>
  );
}

export default RegisterModalContent;
