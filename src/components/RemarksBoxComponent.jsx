import React from "react";

export default function RemarksBoxComponent({ user, remarkName, remarks }) {
  // console.log(remarks);
  // if (remarks.length === 0) {
  return (
    <>
      {remarks?.length > 0 && (
        <div className="col-span-12 bg-[#e3e3e33d] shadow-md rounded-md p-2 px-5">
          <div>
            <h1 className="text-xl font-bold mb-2">{remarkName}</h1>
            <hr className="mb-2" />
          </div>
          <div>
            {remarks?.map((remark, index) => {
              const remarkDateTime = new Date(remark.createdAt);
              const remarkDate = remarkDateTime.toLocaleDateString();
              const remarkTime = remarkDateTime.toLocaleTimeString();
              if (remark.receiverName) {
                // if (remark.receiverName === user) {
                return (
                  <div
                    key={index}
                    className="bg-[#ffffff73] m-2 rounded-md shadow-sm border-b-2 grid grid-cols-4 p-2">
                    <div className="col-span-1">
                      <h3 className="text-lg font-bold">
                        {remark?.senderName}
                      </h3>
                      <p className="text-sm inline mr-5">{remarkDate}</p>
                      <p className="text-sm inline">{remarkTime}</p>
                    </div>
                    <div className="col-span-3 font-semibold">
                      {remark?.privateRemark}
                    </div>
                  </div>
                );
                // }
              } else {
                return (
                  <div
                    key={index}
                    className="bg-[#ffffff73] m-2 rounded-md shadow-sm border-b-2 grid grid-cols-4 p-2">
                    <div className="col-span-1">
                      <h3 className="text-lg font-bold">{remark?.userName}</h3>
                      <p className="text-sm inline mr-5">{remarkDate}</p>
                      <p className="text-sm inline">{remarkTime}</p>
                    </div>
                    <div className="col-span-3 font-semibold">
                      {remark?.remark}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
  // }
}
