import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGeneral } from "../../../store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function UpdateInfoModal({ hideModal, onFinish }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user, loading, setLoading, apiKey, setUser } = useGeneral();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const avatarUrl = watch("avatar.url");
  const isVenueManager = watch("venueManager", user?.data?.venueManager);
  const bio = watch("bio", user?.data?.bio || "");

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    // Filter out empty fields
    const filteredData = {};
    if (data.venueManager !== undefined) {
      filteredData.venueManager = data.venueManager;
    }
    if (data.avatar?.url) {
      filteredData.avatar = {
        ...filteredData.avatar,
        url: data.avatar.url,
      };
    }
    if (data.bio) {
      filteredData.bio = data.bio;
    }
    if (data.avatar?.alt) {
      filteredData.avatar = {
        ...filteredData.avatar,
        alt: data.avatar.alt,
      };
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.data.name}?_bookings=true&_venues=true`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
          body: JSON.stringify(filteredData),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.errors && errorResponse.errors.length > 0
            ? errorResponse.errors[0].message
            : "Failed to update profile. Please check your details.";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Profile update successful:", result);
      setMessage("Profile update successful");

      // Update the user information in Zustand and localStorage
      const updatedUser = {
        ...user,
        data: {
          ...user.data,
          ...filteredData,
        },
      };
      setUser(updatedUser);
      localStorage.setItem(
        "storage",
        JSON.stringify({ user: updatedUser, apiKey })
      );

      onFinish();
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form className="min-w-72" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-bold mb-4">Profile Update</h3>
        <div className="mb-4">
          {user.data.avatar.url && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={avatarUrl || user.data.avatar.url}
                  alt={user.data.avatar.alt || "Avatar"}
                  className="rounded-full w-24 h-24 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">{user.data.name}</h2>
                  <p className="text-sm text-gray-500">
                    {isVenueManager ? "Venue Manager" : "Venue Booker"}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lgs font-semibold">
                  About {user.data.name}
                </h3>
                <div className="text-sm mt-2">
                  {bio || "No biography found"}
                </div>
              </div>
            </>
          )}
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
            Describe your avatar in a few words:
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
            htmlFor="bio"
            className="block text-gray-700 font-semibold mb-2"
          >
            Write a short biography about yourself:
          </label>
          <input
            type="text"
            id="bio"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            {...register("bio", {
              maxLength: {
                value: 240,
                message: "Your biography must be less than 240 characters",
              },
            })}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            defaultChecked={isVenueManager}
            id="venueManager"
            className="mr-2"
            {...register("venueManager")}
          />
          <label htmlFor="venueManager" className="text-gray-700 font-semibold">
            Do you plan to list venues?
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="btn-secondary text-sm flex items-center justify-center w-1/2 py-2 px-4 mt-4 mr-2"
            onClick={hideModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn-primary text-sm flex items-center justify-center w-1/2 py-2 px-4 mt-4 ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
            <ArrowForwardIcon className="ml-2" />
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      {message && <p className="text-green-500 text-sm mt-3">{message}</p>}
    </div>
  );
}

export default UpdateInfoModal;
