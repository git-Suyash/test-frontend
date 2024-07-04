import React from "react";
import { colors } from "../utils/colors";

export default function CardDetailComponent({ card, handleClick }) {
  return (
    <div className="" onClick={() => handleClick(card)}>
      <h1 className="text-2xl font-semibold">{card.subject}</h1>
      <div className="text-sm flex justify-between text-[#7d7d7d] font-semibold mt-2">
        <p>{card.eventDate} </p>
        <p
          className="text-bold p-[3px] rounded-[25px] px-[10px] font-semibold text-white text-[15px] "
          style={{ backgroundColor: colors[card.status.toUpperCase()] }}>
          {card.status}
        </p>
      </div>
      <p className="text-nowrap overflow-hidden text-md mt-2">
        {card.details.length > 45
          ? card.details.substring(0, 45) + "...."
          : card.details}
      </p>
      <p className="text-md mt-1 my-2 font-semibold">
        Proposers : {card.proposers.join(", ").substring(0, 25)} ....
      </p>
    </div>
  );
}
