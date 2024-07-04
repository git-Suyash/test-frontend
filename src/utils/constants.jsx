import clsx from "clsx";

export const milestone_codes = {
  Approved: 0,
  Pending: 1,
  "In Progress": 0,
  Reverted: 1,
  Rejected: 2,
};

export const statuses = (defaultClass,status) => {
  return clsx(`${defaultClass}`, {
    "status-completed": status === "Approved",
    "status-pending": status === "Introduced",
    "status-in-progress": status === "Pending",
    "status-reverted": status === "Reverted",
    "status-action-required": status === "Action Required",
    "status-rejected": status === "Rejected",
  });
};