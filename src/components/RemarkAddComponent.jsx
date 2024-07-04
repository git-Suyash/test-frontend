import React, { useState, useEffect } from "react";

export default function RemarkAddComponent({ open, setOpen, handleSubmit }) {
  const [value, setValue] = useState("Review Notesheet");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
  });

  if (open) {
    return (
      <div className="relative z-10">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-hidden"
          aria-hidden="true"></div>

        <div className=" bg-white lg:w-[30%] md:w-[50%] sm:w-[80%] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-3 rounded-md shadow-lg">
          <h1 className="text-2xl font-semibold">Add a remark</h1>

          <input
            type="text"
            name="Remark"
            placeholder="Add remark"
            className="my-3  p-2 w-full border-solid border-2 border-blue-300"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex justify-end my-3">
            <button
              className="p-2 bg-blue-300 rounded-md text-white"
              onClick={() => {
                setOpen(false);
                document.body.style.overflow = "scroll";
              }}>
              Cancel
            </button>
            <button
              className="p-2 bg-blue-300 rounded-md text-white mx-2"
              onClick={() => {
                e.preventDefault();
                handleSubmit({ remark: value }, toUser);
                setOpen(false);
                document.body.style.overflow = "scroll";
              }}>
              Add remark
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
