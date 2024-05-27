import React from "react";
import { Link } from "react-router-dom";

function CardItem({ card }) {
  return (
    <Link
      to={`./venues/?q=${card.searchWord}`}
      name="click to search for this word"
      className="card-item relative"
    >
      <div className="card-text poppins-black text-2xl tracking-widest">
        {card.searchWord.toUpperCase()}
      </div>
      <div className="card-image-container">
        <img
          loading="lazy"
          src={
            `${card.src}` ||
            "https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813"
          }
          alt={card.altText}
          className="card-image"
        />
      </div>
    </Link>
  );
}

export default CardItem;
