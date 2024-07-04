import React from "react";

export const ActionButtonComponent = ({ src, alt, text, onClick }) => {
  let enabled = true;
  return (
    <button
      type="button"
      className={`mx-1 justify-center mt-2 shadow-sm rounded-md border-[1px] border-gray-400 py-1 ${
        enabled && "hover:bg-gray-100"
      }  ${enabled && "border-blue-500"}`}
      disabled={!enabled}
      onClick={onClick}>
      <div className="w-fit mx-auto ">
        <img
          src={src}
          alt={alt}
          className=""
          style={{
            width: "1.5em",
            height: "1.5em",
            margin: "0.25rem",
          }}
          title={text}
        />
      </div>
      <span className="text-[14px] uppercase font-semibold text-gray-800">
        {text}
      </span>
    </button>
  );
};

export default ActionButtonComponent

