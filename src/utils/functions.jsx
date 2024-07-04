export const canTakeAction = (status) => {
  // console.log(status)
  return status === "Pending" || status === "Action Required";
};
