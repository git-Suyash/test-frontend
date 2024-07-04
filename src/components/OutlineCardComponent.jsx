import React from "react";
import { colors } from "../utils/colors";
import { useLocation, useNavigate } from "react-router-dom";
import CardDetailComponent from "./CardDetailComponent";
import StatusBarComponent from "./StatusBarComponent";

export default function OutlineCardComponent({ card, viewer }) {
  // console.log(sortUsing);
  const navigate = useNavigate();
  const { location } = useLocation();
  // const handleClick = () => {
  //   return;
  // };
  const handleClick = (notesheet) => {
    console.log("click");
    navigate("../notesheet", {
      state: { notesheet: notesheet, viewer: viewer ? viewer : false },
    });
  };
  return (
    <>
      <div
        className="w-[350px] h-[250px] bg-[#ffffff00] shadow-xl rounded-lg hover:shadow-2xl hover:scale-[1.03] duration-300 border-[3px] border-b-[6px] p-3 cursor-pointer"
        style={{
          borderColor: colors[card.status.toUpperCase()],
        }}>
        <CardDetailComponent card={card} handleClick={handleClick} />

        <StatusBarComponent milestones={card.users} />
      </div>
    </>
  );
}
