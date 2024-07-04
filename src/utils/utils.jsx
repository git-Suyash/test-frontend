export const canTakeAction = (status) => {
    // console.log(status)
    return status === "Pending" || status === "Action Required";
  };
  
  export function countNestedLevels(obj) {
    if (typeof obj === 'object' && obj !== null && Array.isArray(obj)) {
      return 1 + countNestedLevels(obj[0][Object.keys(obj[0])]);
    } else {
      return 0;
    }
  }