import React, { useState } from "react";

export default function ForwardComponent({
  open,
  setOpen,
  handleSubmit,
  userList,
}) {
  const [user, setUser] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-lg p-4">
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
              onChange={(e) => setUser(e.target.value)}>
              <option value="">Select User</option>
              {userList.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-b-lg">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded border border-yellow-500 hover:shadow-md"
              onClick={handleClose}>
              CANCEL
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded border border-yellow-500 hover:shadow-md ml-2"
              onClick={() => {
                handleSubmit(user);
                handleClose();
              }}>
              FORWARD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
