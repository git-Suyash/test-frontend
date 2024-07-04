import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../utils/colors";
import { useAuth } from "../hooks/useAuth";

import reject from "../images/reject.jpg";
import revert from "../images/revert.png";
import remark from "../images/remark.svg";
import tick from "../images/approve.png";
import private_remark from "../images/private-remark.svg";
import progress from "../images/preview.svg";

import CardDetailComponent from "./CardDetailComponent";
import StatusBarComponent from "./StatusBarComponent";
import ActionButtonComponent from "./ActionButtonComponent";
import RevertComponent from "./RevertComponent";
import RemarkAddComponent from "./RemarkAddComponent";
import PrivateRemarkAddComponent from "./PrivateRemarkAddComponent";
import ForwardComponent from "./ForwardComponent";


const canTakeAction = (userStatus) => {
  const allowedStatuses = ['APPROVER', 'REVIEWER'];
  return allowedStatuses.includes(userStatus);
}

export default function OutlineCardButtonComponent({
  card,
  userList,
  onApprove,
  onRemark,
  onPrivateRemark,
  onRevert,
  onForward,
  onReject,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (notesheet) => {
    navigate("../notesheet", { state: { notesheet: notesheet } });
  };

  const onApproveSubmit = (id) => {
    onApprove(id);
  };

  const [remarkOpen, setRemarkOpen] = useState(false);
  const onRemarkSubmit = (id, data) => {
    onRemark(id, data);
  };

  const [privateRemarkOpen, setPrivateRemarkOpen] = useState(false);
  const onPrivateRemarkSubmit = (formData, toUser, nid) => {
    onPrivateRemark(formData.remark, toUser, nid);
  };

  const privateRemarkList = () => {
    return userList;
  };

  const [forwardOpen, setForwardOpen] = useState(false);
  const onForwardSubmit = (user) => {
    onForward(user);
  };

  const [revertOpen, setRevertOpen] = useState(false);
  const onRevertSubmit = (formData, toUser, nid) => {
    onRevert(formData, toUser, nid);
  };

  const revertList = () => {
    let u = card.users.find((app) => app.userId === user.userId);
    return card.users.filter((app) => app.userRank < u.userRank);
  };

  const enableAction = (card) => {
    let u = card.users.find((app) => app.userId === user.userId);
    if (u === undefined) {
      return false;
    }
    return canTakeAction(u.userStatus);
  };

  return (
    <>
      <div
        className="w-[400px] h-[400px] bg-[#ffffff00] shadow-xl rounded-lg hover:shadow-2xl hover:scale-[1.03] duration-300  m-10 border-[3px] border-b-[6px] p-3"
        style={{
          borderColor: colors[card.status.toUpperCase()],
        }}>
        <CardDetailComponent card={card} handleClick={handleClick} />
        <StatusBarComponent milestones={card.users} />

        <div className="grid grid-cols-3 gap-2">
          <ActionButtonComponent
            src={tick}
            alt="approve"
            text="approve"
            onClick={() => onApproveSubmit(card.notesheetId)}
            enabled={enableAction(card)}
          />
          <ActionButtonComponent
            src={revert}
            alt="revert"
            text="revert"
            onClick={() => setRevertOpen(true)}
            enabled={enableAction(card)}
          />
          <ActionButtonComponent
            src={remark}
            alt="remark"
            text="remark"
            onClick={() => setRemarkOpen(true)}
            enabled={enableAction(card)}
          />
          <ActionButtonComponent
            src={reject}
            alt="reject"
            text="reject"
            onClick={() => onReject(card)}
            enabled={enableAction(card)}
          />
          <ActionButtonComponent
            src={private_remark}
            alt="private remark"
            text="private"
            onClick={() => setPrivateRemarkOpen(true)}
            enabled={enableAction(card)}
          />
          <ActionButtonComponent
            src={progress}
            alt="pdf"
            onClick={() => onReject(card)}
            text="export"
            enabled={enableAction(card)}
          />
        </div>
      </div>
      <RevertComponent
        handleSubmit={(data, toUser) =>
          onRevertSubmit(data, toUser.userId, card.notesheetId)
        }
        open={revertOpen}
        setOpen={setRevertOpen}
        userList={revertList()}
      />

      <RemarkAddComponent
        handleSubmit={(data) => onRemarkSubmit(card.notesheetId, data)}
        open={remarkOpen}
        setOpen={setRemarkOpen}
      />

      <PrivateRemarkAddComponent
        handleSubmit={(data, toUser) =>
          onPrivateRemarkSubmit(data, toUser.id, card.notesheetId)
        }
        open={privateRemarkOpen}
        setOpen={setPrivateRemarkOpen}
        userList={privateRemarkList()}
      />

      <ForwardComponent
        handleSubmit={(data) => onForwardSubmit(data)}
        open={forwardOpen}
        setOpen={setForwardOpen}
        userList={userList}
        enabled={true}
      />
    </>
  );
}
