import React from "react";
import CardItem from "./CardItem";

function CardGroup({ cards }) {
  return (
    <div className="card-container sm:px-8">
      {cards.map((card, index) => (
        <CardItem key={`${card.id}-${index}`} card={card} />
      ))}
    </div>
  );
}

export default CardGroup;
