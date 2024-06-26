import React, { useEffect, useState, useRef } from "react";
import { useGeneral } from "../store";
import { useForm, useFieldArray } from "react-hook-form";
import Loader from "../components/Loader";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardsIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import StarRateSharpIcon from "@mui/icons-material/StarRateSharp";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import AddToFavorites from "../components/buttons/AddToFavorite";
import Facilities from "../components/venues/Facilities";
import ModalButton from "../components/buttons/ModalButton";
import { differenceInDays, parseISO, format } from "date-fns";

function CreateVenue() {
  const { user, apiKey } = useGeneral();
  const { search } = useLocation();
  const navigate = useNavigate();
  const isPreview = new URLSearchParams(search).get("preview") === "true";
  const previewData = isPreview
    ? JSON.parse(sessionStorage.getItem("previewData"))
    : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastImage, setLastImage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [maxPageWidth, setMaxPageWidth] = useState(window.innerWidth >= 1280);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMaxWidth, setMaxWidth] = useState(window.innerWidth >= 1638);
  const sliderRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: null,
      maxGuests: null,
      rating: null,
      media: [{ url: "", alt: "" }],
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
      owner: {
        name: user?.data.name,
        avatar: user?.data.avatar || "",
      },
    },
  });

  const {
    fields: mediaFields,
    append: addMediaField,
    remove: removeMediaField,
  } = useFieldArray({
    control,
    name: "media",
  });

  const media = watch("media");

  useEffect(() => {
    const storedData = sessionStorage.getItem("formDataCreate");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem("formDataCreate", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setMaxWidth(window.innerWidth >= 1638);
      setMaxPageWidth(window.innerWidth >= 1280);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${
        currentImageIndex * (maxPageWidth ? 1280 : 100)
      }${maxPageWidth ? "px" : "vw"})`;
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
    }

    if (currentImageIndex === media.length - 1) {
      setLastImage(true);
    } else {
      setLastImage(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [currentImageIndex, isMobile, isMaxWidth, media.length]);

  function capitalizeFirstLetter(string) {
    if (string.includes(" ")) {
      const words = string.split(" ");
      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join(" ");
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const handleRemoveMediaField = (index) => {
    if (index <= currentImageIndex && currentImageIndex !== 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
    removeMediaField(index);
  };

  const handlePreview = (data) => {
    sessionStorage.setItem("previewData", JSON.stringify(data));
    setErrorMessage("");
    navigate(`?preview=true`);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate, window.location.key]);
  useEffect(() => {
    document.title = "Create a venue | Holidaze";
  }),
    [];

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.accessToken}`,
            "X-Noroff-API-Key": apiKey.data.key,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 400 && errorResponse.errors?.length) {
          setErrorMessage(errorResponse.errors[0].message);
        } else if (response.status === 400 && errorResponse.errors.message) {
          setErrorMessage(errorResponse.errors[0].message);
        } else {
          setErrorMessage("Failed to create venue.");
        }
        throw new Error(errorResponse.message || "Failed to create venue.");
      }
      const responseData = await response.json();
      sessionStorage.removeItem("formDataCreate");
      sessionStorage.removeItem("previewData");
      navigate(`/venues/${responseData.data.id}`);
    } catch (error) {
      setError(true);
      console.error("There was a problem with your operation:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (isPreview && previewData) {
    return (
      <div className="page-max-width md:self-start xl:self-center flex flex-wrap">
        <div className="relative align-top-header">
          <div className="slider-image-container relative overflow-hidden">
            {previewData.media.length > 1 ? (
              <div
                className="flex image-filter"
                ref={sliderRef}
                style={{
                  width: `${previewData.media.length * 100}vw`,
                }}
              >
                {previewData.media.map((media, index) => (
                  <img
                    loading="eager"
                    key={index}
                    src={
                      media.url ||
                      "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                    }
                    alt={media.alt}
                    className={`min-h-96 single-venue-slider-image ${
                      isMobile ? "w-full" : "w-full"
                    } object-cover object-position-center`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex image-filter" ref={sliderRef}>
                <img
                  loading="eager"
                  src={
                    previewData.media[0].url ||
                    "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                  }
                  alt={previewData.media[0].alt}
                  className={`min-h-96  single-venue-slider-image-single-image w-full object-cover object-position-center`}
                />
              </div>
            )}
          </div>
          {previewData.media.length > 1 && (
            <>
              <button
                name="next image"
                type="button"
                onClick={nextImage}
                className={`${
                  lastImage ? "hidden" : ""
                } create-venue-next-button p-3`}
              >
                <ArrowForwardIcon />
              </button>
              <button
                name="prev image"
                type="button"
                onClick={prevImage}
                className={`single-venue-prev-button p-3 ${
                  currentImageIndex > 0 ? "" : "hidden"
                }`}
              >
                <ArrowBackwardsIcon />
              </button>
            </>
          )}
        </div>
        <div className="info-wrapper xl:w-full w-screen flex-row flex flex-wrap">
          <div className="md:w-1/2 px-8 p-6">
            <div
              className={`location flex gap-3 items-center flex-row pt-sans-regular text-gray-700 font-light`}
            >
              <RoomOutlinedIcon />
              <h2 className="pt-sans-regular text-gray-700 font-light">
                {previewData.location.city === null &&
                  previewData.location.address === null &&
                  previewData.location.country === null && (
                    <span className="pt-sans-regular text-gray-700 font-light">
                      Location not listed
                    </span>
                  )}
                {previewData.location.address && (
                  <>
                    {capitalizeFirstLetter(previewData.location.address)}
                    {previewData.location.city && (
                      <span className="pt-sans-regular text-gray-700 font-light">
                        {", "}
                      </span>
                    )}
                  </>
                )}
                {previewData.location.city && (
                  <>
                    {capitalizeFirstLetter(previewData.location.city)}
                    {previewData.location.country && (
                      <span className="pt-sans-regular text-gray-700 font-light">
                        {", "}
                      </span>
                    )}
                  </>
                )}
                {previewData.location.country && (
                  <> {capitalizeFirstLetter(previewData.location.country)}</>
                )}
              </h2>
            </div>
            <h1 className="text-2xl py-2 font-bold">{previewData.name}</h1>
            <span className="text-xl py-2 ">
              {previewData.price} NOK /night
            </span>
            <div className="maxguests pt-5 md:py-5">
              <h2 className="text-lg font-regula">This venue offers</h2>
              <Facilities venue={previewData} />
            </div>
            <div className="description pt-0 py-0 sm:py-5">
              <h2 className="text-lg font-regular ">Description</h2>
              <p className="py-2 text-gray-600 text-sm">
                {previewData.description
                  ? previewData.description
                  : "No description found"}
              </p>
            </div>
          </div>
          <div className="md:w-1/2 px-8 sm:p-6 p-0 pb-6">
            <div className="button-container md:flex-row md:gap-2 flex flex-col justify-start w-full">
              <button
                name="back"
                onClick={() => navigate(-1)}
                className={`btn-primary-reverse min-w-40 text-end text-sm poppins-semibold mt-6 max-w-64 flex items-center md:self-end `}
              >
                Back
              </button>
              <button
                name="create venue"
                onClick={handleSubmit(onSubmit)}
                className={`btn-primary text-sm poppins-semibold mt-6 max-w-64 flex items-center md:self-end justify-between ${
                  loading ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                Create Venue
                <ArrowForwardIcon />
              </button>
            </div>
            {errorMessage && (
              <div className="error-message text-red-500 px-8 py-4">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handlePreview)}
      className="page-max-width pt-sans-regular md:self-start xl:self-center flex flex-wrap"
    >
      <div className="relative align-top-header w-full">
        <div className="slider-image-container relative overflow-hidden">
          {media.length > 1 ? (
            <div
              className="flex image-filter"
              ref={sliderRef}
              style={{
                width: `${media.length * 100}vw`,
                maxWidth: `${media.length * 1280}px`,
              }}
            >
              {media.map((mediaItem, index) => (
                <img
                  loading="eager"
                  key={index + mediaItem.alt}
                  src={
                    mediaItem.url ||
                    "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                  }
                  alt={mediaItem.alt}
                  className={`min-h-96 bg-gray-300 single-venue-slider-image ${
                    isMobile ? "w-full" : " w-full"
                  } object-cover object-position-center`}
                />
              ))}
            </div>
          ) : (
            <div className="flex image-filter" ref={sliderRef}>
              <img
                loading="eager"
                src={
                  media[0]?.url ||
                  "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
                }
                alt={media[0]?.alt}
                className={`min-h-96 bg-gray-400  single-venue-slider-image-single-image w-full object-cover object-position-center`}
              />
            </div>
          )}
          {media.length > 1 && (
            <>
              <button
                name="next image"
                type="button"
                onClick={nextImage}
                className={`${
                  lastImage ? "hidden" : ""
                } create-venue-next-button p-3`}
              >
                <ArrowForwardIcon />
              </button>
              <button
                name="prev image"
                type="button"
                onClick={prevImage}
                className={`single-venue-prev-button p-3 ${
                  currentImageIndex > 0 ? "" : "hidden"
                }`}
              >
                <ArrowBackwardsIcon />
              </button>
            </>
          )}
          <button
            type="button"
            name="add image"
            onClick={() => addMediaField({ url: "", alt: "" })}
            className={` single-venue-next-button p-3`}
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div className="info-wrapper xl:w-full w-screen flex-col flex">
        <div className="flex flex-row mx-8 mt-6 gap-2">
          <ImageOutlinedIcon />
          <h2 className="poppins-semibold text-black text-md">Add Images</h2>
        </div>
        <div className="flex container-image-boxes mx-5 sm:max-w-1/2 flex-row flex-wrap mb-4">
          {mediaFields.map((mediaItem, index) => (
            <div
              className=" ml-0 image-boxes sm:w-auto w-full sm:max-w-1/2 sm:max-w-68 sm:flex flex-col p-4 pb-0 mb-0 relative"
              key={mediaItem.id}
            >
              <h2 className="poppins-semibold text-sm">
                Image {index + 1} of {media.length}
              </h2>
              <div className="link-boxes">
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor={`media.${index}.url`}>
                    Paste an image link:
                  </label>
                  <input
                    type="text"
                    id={`media.${index}.url`}
                    {...register(`media.${index}.url`, { required: true })}
                    placeholder="Image URL"
                    className="p-2 border rounded"
                  />
                  {errors.media?.[index]?.url && (
                    <span className="text-red-500">Image URL is required</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor={`media.${index}.alt`}>Alt text:</label>
                  <input
                    type="text"
                    id={`media.${index}.alt`}
                    {...register(`media.${index}.alt`, { required: true })}
                    placeholder="Alt text"
                    className="p-2 border rounded"
                  />
                  {errors.media?.[index]?.alt && (
                    <span className="text-red-500">Alt text is required</span>
                  )}
                </div>
              </div>
              {media.length > 1 && (
                <button
                  type="button"
                  name="remove image"
                  onClick={() => handleRemoveMediaField(index)}
                  className="top-2 right-2 p-2 rounded text-gray-700 hover:text-red-500 absolute"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="info-wrapper xl:w-full w-screen flex-row flex flex-wrap">
          <div className="md:w-1/2 px-8 p-6">
            <div className="location flex gap-3 items-start flex-col pt-sans-regular text-gray-700 font-light">
              <div className="flex flex-row gap-2">
                <RoomOutlinedIcon />
                <h2 className="poppins-semibold text-black text-md">
                  Location
                </h2>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="address" className="text-sm font-regular">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("location.address", {
                    required: "Address is required",
                  })}
                  placeholder="2 Chome-2-3 Yurakucho"
                  className="border rounded w-full p-2 mb-2"
                />
                {errors.location?.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="city" className="text-sm font-regular">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("location.city", {
                    required: "City is required",
                  })}
                  placeholder="Tokyo"
                  className="border rounded w-full p-2 mb-2"
                />
                {errors.location?.city && (
                  <span className="text-red-500">City is required</span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="country" className="text-sm font-regular">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("location.country", {
                    required: "Country is required",
                  })}
                  placeholder="Japan"
                  className="border rounded w-full  p-2 mb-2"
                />
                {errors.location?.country && (
                  <span className="text-red-500">Country is required</span>
                )}
              </div>
            </div>
            <div className="venue-bottom-section flex flex-col flex-wrap gap-2 mt-6">
              <div className="flex flex-row gap-2">
                <StickyNote2OutlinedIcon className="text-gray-600" />
                <h2 className="poppins-semibold text-md">Details</h2>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="venue-name" className="text-sm font-regular ">
                  Venue Name
                </label>
                <input
                  type="text"
                  id="venue-name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Traditional Japanese house"
                  className="border rounded w-full p-2 mb-2"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label
                  htmlFor="price-per-night"
                  className="text-sm font-regular "
                >
                  Price per night
                </label>
                <input
                  type="number"
                  id="price-per-night"
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Price is required",
                  })}
                  placeholder={2000}
                  className="border rounded w-full p-2 mb-2"
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label
                  htmlFor="maximum-guests"
                  className="text-sm font-regular "
                >
                  Maximum Guests
                </label>
                <input
                  id="maximum-guests"
                  type="number"
                  min={1}
                  {...register("maxGuests", {
                    valueAsNumber: true,
                    required: "Max Guests is required",
                  })}
                  placeholder={6}
                  className="border rounded w-full p-2 mb-2"
                />
                {errors.maxGuests && (
                  <span className="text-red-500">Max Guests is required</span>
                )}
              </div>
            </div>
            <div className="maxguests pt-5 md:py-5">
              <div className="flex flex-row gap-2">
                <CategoryOutlinedIcon className="text-gray-600" />
                <h2 className="poppins-semibold text-md">This venue offers</h2>
              </div>
              <div className="flex flex-row gap-5 my-4 flex-wrap">
                <label className="flex gap-2">
                  <input type="checkbox" {...register("meta.wifi")} />
                  WiFi
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" {...register("meta.parking")} />
                  Parking
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" {...register("meta.breakfast")} />
                  Breakfast
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" {...register("meta.pets")} />
                  Pets allowed
                </label>
              </div>
            </div>
            <div className="description pt-0 py-0 sm:py-5">
              <div className="flex flex-row gap-2">
                <NotesOutlinedIcon className="text-gray-600" />
                <h2 className="text-md poppins-semibold">Description</h2>
              </div>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="This venue is a traditional Japanese house located in the heart of Tokyo. It is perfect for a family of 6 or a group of friends. The house is equipped with all the modern amenities and is close to all the major attractions in the city."
                className="py-2 text-gray-600 text-sm border rounded p-2 w-full mt-2"
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>
          </div>
          <div className="md:w-1/2 w-full px-8 md:p-6 p-0 pb-6 flex flex-col">
            <div className="flex flex-col justify-end gap-2 items-start md:items-end pt-0 md:pt-0 md:px-8 md:p-6">
              <div className="flex flex-row gap-2">
                <StarRateSharpIcon className="text-yellow-400" />
                <h2 className="poppins-semibold text-md">Rating</h2>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label
                  htmlFor="rating"
                  className="text-sm font-regular text-start md:text-end"
                >
                  Venue Rating
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  {...register("rating", {
                    valueAsNumber: true,
                    required: "Rating is required",
                    min: 0,
                    max: 5,
                  })}
                  placeholder="4"
                  className="border text-sm rounded md:w-auto w-full p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              name="preview"
              className={`btn-primary text-sm poppins-semibold mt-6 md:mr-8 md:mt-0 max-w-64 flex items-center md:self-end justify-between ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Preview Venue
              <ArrowForwardIcon />
            </button>
            <button
              name="create venue"
              type="button"
              onClick={handleSubmit(onSubmit)}
              className={`btn-primary text-sm poppins-semibold mt-2 md:mr-8  max-w-64 flex items-center md:self-end justify-between ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Create Venue
              <ArrowForwardIcon />
            </button>
            {errorMessage && (
              <div className="error-message text-red-500 px-8 py-4">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateVenue;
