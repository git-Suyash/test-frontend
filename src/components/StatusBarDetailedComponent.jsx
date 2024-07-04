import React from "react";
import { colors } from "../utils/colors";
export default function StatusBarDetailedComponent({ milestones }) {
  milestones.sort((a, b) => a.userRank - b.userRank);
  return (
    <div className="p-5 overflow-x-auto">
      <div
        className="flex w-fit relative
      ">
        {milestones.map((milestone, index) => {
          const userStatusDateTime = new Date(milestone?.userStatusUpdatedAt);
          const userStatusDate = userStatusDateTime.toLocaleDateString();
          const userStatusTime = userStatusDateTime.toLocaleTimeString();

          return (
            <div className=" w-fit relative" key={index}>
              {index === 0 && (
                <>
                  <div className="absolute w-[50%] h-[2px] bg-gray-500 top-6 right-0 -z-10"></div>
                </>
              )}
              {index === milestones.length - 1 && (
                <div className="absolute w-[50%] h-[2px] bg-gray-500 top-6 -z-10"></div>
              )}

              {index !== 0 && index !== milestones.length - 1 && (
                <div className="absolute w-[100%] h-[2px] bg-gray-500 top-6 -z-10"></div>
              )}

              <div
                className="text-white w-[50px] p-3 rounded-[50%] text-center mx-auto"
                style={{
                  backgroundColor: colors[milestone.userStatus.toUpperCase()],
                }}>
                {" "}
                {index + 1}
              </div>
              <div className="text-center px-12">
                <h1 className="text-lg font-semibold">{milestone.userName}</h1>
                <span className="text-sm">
                  {milestone.userEmail}
                  <br />
                  {userStatusDate}
                  <br />
                  {userStatusTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
