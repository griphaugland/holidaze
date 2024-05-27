import React from "react";
import { Link } from "react-router-dom";

function CardItem({ card }) {
  return (
    <Link to={`./venues/?q=${card.searchWord}`} className="card-item relative">
      <div className="card-text poppins-black text-2xl tracking-widest">
        {card.searchWord.toUpperCase()}
      </div>
      <div className="card-image-container">
        <img src={`${card.src}`} alt={card.alt} className="card-image" />
      </div>
    </Link>
  );
}

export default CardItem;
