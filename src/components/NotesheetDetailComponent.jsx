import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { canTakeAction } from "../utils/functions";

import RemarksBoxComponent from "./RemarksBoxComponent";
import StatusBarDetailedComponent from "./StatusBarDetailedComponent";
import PrivateRemarkAddComponent from "./PrivateRemarkAddComponent";
import RemarkAddComponent from "./RemarkAddComponent";
import RevertComponent from "./RevertComponent";

import { FiMenu } from "react-icons/fi";
import { FaUndoAlt } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiChatPrivateFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa6";
import { colors } from "../utils/colors";

export default function NotesheetDetailComponent({
  privateRemark,
  notesheet,
  onApprove,
  onRemarkSubmit,
  onRevert,
  onEdit,
  viewer,
  userList,
  onPrivateRemark,
}) {
  const { user } = useAuth();

  const createdAtDate = new Date(notesheet?.createdAt);
  const formattedDate = `${createdAtDate.toLocaleDateString()}`;
  const userInfo = notesheet?.users?.find((app) => app.userRank === 0);

  const [showMenu, setShowMenu] = useState(false);
  const [openPrivateRemark, setOpenPrivateRemark] = useState(false);
  const [openRemark, setOpenRemark] = useState(false);
  const [openRevertBox, setOpenRevertBox] = useState(false);

  const canEdit = notesheet?.edit && user.userId === userInfo?.userId;
  const enableAction = (card) => {
    let u = card.users?.find((app) => app.userId === user.userId);
    if (u === undefined) {
      return false;
    }
    // console.log("u", u);
    return canTakeAction(u.userStatus);
  };

  const onPrivateRemarkSubmit = (formData, toUser, nid) => {
    onPrivateRemark(formData.remark, toUser, nid);
  };

  const privateRemarkList = () => {
    // let u = card.users.find((app) => app.userId === user.userId);
    return userList;
  };

  const revertList = () => {
    let u = notesheet.users?.find((app) => app.userId === user.userId);
    // console.log(notesheet.users[0].userRank);
    return notesheet.users.filter((app) => app.userRank < u.userRank);
  };

  // eslint-disable-next-line no-unused-vars
  const onForward = (form) => {
    // console.log(form);
  };

  const handleClick = (notesheet) => {
    onEdit(notesheet.notesheetId);
  };

  const handleApprove = (id) => {
    onApprove(id);
  };
  const onRevertSubmit = (formData, toUser, nid) => {
    onRevert(formData, toUser, nid);
  };

  console.log(enableAction(notesheet));

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-4 p-10 text-[#484848]">
        <div className="lg:col-span-10 md:col-span-12 sm:col-span-12 bg-[#e3e3e33d] shadow-md rounded-md p-2 px-5">
          <div className="">
            <h1 className="text-4xl font-bold uppercase">
              {notesheet.subject}
            </h1>
          </div>
          <div className="mt-10 text-lg">
            <p>
              <span className="font-bold uppercase">Date:</span> {formattedDate}
            </p>

            <p>
              <span className="font-bold uppercase">Department:</span>{" "}
              {notesheet?.department || "Not provided"}
            </p>

            <p>
              <span className="font-bold uppercase">School:</span>{" "}
              {notesheet?.school || "Not provided"}
            </p>

            <p>
              <span className="font-bold uppercase">Finance:</span>{" "}
              {notesheet.finance ? notesheet.finance + "Rs" : "Not provided"}
            </p>
          </div>
        </div>

        <div
          className="lg:col-span-2 md:col-span-12 sm:col-span-12 bg-[#e3e3e33d] shadow-md shadow-[#939393] rounded-md flex justify-center items-center drop-shadow-lg"
          style={{
            backgroundColor: colors[notesheet.status.toUpperCase()],
          }}>
          <h1 className="text-white text-2xl mb-2 font-bold">
            {notesheet.status}
          </h1>
        </div>

        <div className="col-span-12 bg-[#e3e3e33d] shadow-md rounded-md p-2 px-5">
          <div className="text-xl">
            <h1 className="font-bold uppercase">Objectives</h1>
            <p>{notesheet.objectives}</p>
          </div>
          <br />
          <br />
          <div className="text-xl">
            <h1 className="font-bold uppercase">Details</h1>
            <p>{notesheet.details}</p>
          </div>
        </div>

        {notesheet.users && (
          <div className="col-span-12 bg-[#e3e3e33d] shadow-md rounded-md p-2">
            <StatusBarDetailedComponent milestones={notesheet.users} />
          </div>
        )}

        {userInfo ? (
          <>
            <RemarksBoxComponent
              user={userInfo.userName}
              remarkName="Remarks"
              remarks={notesheet.remarks}
            />
            <RemarksBoxComponent
              user={userInfo.userName}
              remarkName="Private Remarks"
              remarks={privateRemark}
            />
          </>
        ) : (
          <></>
        )}

        <PrivateRemarkAddComponent
          open={openPrivateRemark}
          setOpen={setOpenPrivateRemark}
          handleSubmit={(data, toUser) =>
            onPrivateRemarkSubmit(data, toUser.id, notesheet.notesheetId)
          }
          userList={privateRemarkList()}
        />

        <RemarkAddComponent
          open={openRemark}
          setOpen={setOpenRemark}
          handleSubmit={(data) => onRemarkSubmit(notesheet.notesheetId, data)}
        />

        <RevertComponent
          open={openRevertBox}
          setOpen={setOpenRevertBox}
          handleSubmit={(data, user) =>
            onRevertSubmit(data, user.userId, notesheet.notesheetId)
          }
          userList={revertList()}
        />
      </div>

      <div className="w-fit flex flex-col space-y-4 bottom fixed bottom-14 right-10">
        {showMenu && (
          <>
            {!viewer && (
              <>
                <button
                  className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg disabled:cursor-default disabled:bg-[#ff9a26c0]"
                  onClick={() => setOpenRevertBox(true)}
                  disabled={!enableAction(notesheet)}
                  title="Revert">
                  <FaUndoAlt
                    size={30}
                    color={!enableAction(notesheet) ? "#e4e4e4" : "white"}
                  />
                </button>

                <button
                  className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg disabled:cursor-default disabled:bg-[#ff9a26c0]"
                  onClick={() => handleApprove(notesheet.notesheetId)}
                  disabled={!enableAction(notesheet)}
                  title="Approve">
                  <MdDone
                    size={30}
                    color={!enableAction(notesheet) ? "#e4e4e4" : "white"}
                  />
                </button>

                {canEdit && (
                  <button
                    className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg disabled:cursor-default disabled:bg-[#ff9a26c0]"
                    disabled={!enableAction(notesheet)}
                    title="Edit Notesheet">
                    <FaPen
                      size={30}
                      color={!enableAction(notesheet) ? "#e4e4e4" : "white"}
                      onClick={() => handleClick(notesheet)}
                    />
                  </button>
                )}

                <button
                  className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg disabled:cursor-default disabled:bg-[#ff9a26c0]"
                  onClick={() => setOpenRemark(true)}
                  disabled={!enableAction(notesheet)}
                  title="Add remark">
                  <IoChatbubbleEllipses
                    size={30}
                    color={!enableAction(notesheet) ? "#e4e4e4" : "white"}
                  />
                </button>
              </>
            )}

            <button
              className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg"
              title="Add private remark">
              <RiChatPrivateFill
                size={30}
                color="white"
                onClick={() => setOpenPrivateRemark(true)}
              />
            </button>
          </>
        )}

        <button
          className="bg-[#ff9a26fa] p-4 rounded-full cursor-pointer shadow-lg"
          title="Open Menu">
          <FiMenu
            size={30}
            color="white"
            onClick={() => setShowMenu((prev) => !prev)}
          />
        </button>
      </div>

      {/* <div
        className="fixed bg-[#ff9a26fa] bottom-14 right-[10px] p-4 rounded-full cursor-pointer shadow-lg"
        title="Options">
        
      </div> */}
    </div>
  );
}
