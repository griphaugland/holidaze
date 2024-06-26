import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AddToFavorite from "../buttons/AddToFavorite";

function VenueItem({ item }) {
  return (
    <article
      key={item.id}
      className="flex flex-col relative items-start justify-between shadow-md rounded-lg venue-card"
    >
      <AddToFavorite size="small" venue={item} />
      <a
        className="w-full h-full"
        name={`Go to ${item.name} venue card`}
        href={`../venues/${item.id}`}
      >
        <img
          loading="lazy"
          src={
            item.media[0]?.url === "https://source.unsplash.com/random"
              ? "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
              : item.media[0]?.url ||
                "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
          }
          alt={item.media[0]?.alt}
          className="w-48 h-22 object-cover flex items-center justify-center"
        />
      </a>
      <div className="flex items-start gap-2 w-full flex-col justify-between min-h-36">
        <div className="flex items-start flex-col gap-2 w-full">
          <a
            name={`Go to ${item.name} venue card`}
            className="text-xl px-3 venue-title tracking-wide font-bold mt-4"
            href={`../venues/${item.id}`}
            title={item.name}
          >
            {item.name
              ? item.name.length > 20
                ? item.name.substring(0, 20) + "..."
                : item.name
              : "No name found"}
          </a>
          <div className="flex px-3 gap-2 w-full justify-between mt-1">
            <div className="flex items-start flex-col-reverse gap-0">
              <h4 className="text-xl flex-end venue-price current-price text-black">
                {item.price} NOK / night
              </h4>
            </div>
          </div>
        </div>

        <p
          className="text-sm font-extralight px-3 pb-4 mb-auto text-gray-500 truncate"
          title={item.description}
        >
          {item.description
            ? item.description.length > 35
              ? item.description.substring(0, 35) + "..."
              : item.description
            : "No description"}
        </p>
      </div>
    </article>
  );
}

export default VenueItem;
