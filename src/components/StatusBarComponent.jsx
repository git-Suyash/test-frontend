import React from "react";
import { colors } from "../utils/colors";

export default function StatusBarComponent({ milestones }) {
  milestones?.sort((a, b) => a?.userRank - b?.userRank);
  // console.log(milestones);
  return (
    <div className=" relative px-4 my-6">
      <div className="flex justify-between">
        <div className="absolute bg-gray-500 w-[90%] h-[2px] rounded-md -z-10 mt-[6px]"></div>
        {milestones?.map((milestone, index) => (
          <div
            key={index}
            style={{
              left: `${(index / (milestones?.length - 1)) * 100}%`,
            }}>
            <div className="text-center">
              <div
                className="p-2 rounded-full"
                style={{
                  backgroundColor: colors[milestone.userStatus.toUpperCase()],
                }}></div>
              <div style={{ fontSize: "12px" }}>{index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
