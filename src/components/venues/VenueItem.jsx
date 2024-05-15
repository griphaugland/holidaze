import React from "react";
import { Link } from "react-router-dom";

function VenueItem({ item }) {
  return (
    <article
      key={item.id}
      className="flex flex-col items-start justify-between"
    >
      <a className="w-full h-full" href={`venues/${item.id}`}>
        <img
          src={item.media[0]?.url}
          alt="venue"
          className="w-48 h-22 object-cover flex items-center justify-center"
        />
      </a>
      <div className="flex items-start gap-2 w-full flex-col justify-between min-h-36">
        <div className="flex items-start flex-col gap-2 w-full">
          <a
            className="text-xl px-3 venue-title font-bold mt-4"
            href={`venues/${item.id}`}
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
              <p className="text-xl flex-end venue-price current-price text-black">
                {item.price} NOK / night
              </p>
            </div>
            {/*  <div className="flex items-center gap-1 w-full justify-end mt-1">
                <AddToFavorite venue={item} />
                <Link
                  to={`./${item.id}`}
                  className="secondary-button-large text-black px-4 py-2 rounded-lg"
                >
                  View
                </Link>
              </div> */}
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
