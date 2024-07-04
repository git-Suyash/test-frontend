import { useState } from "react";

export const useSessionStorage = (keyName, defaultValue) => {
  // Initialize state with the value retrieved from sessionStorage or the defaultValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      // If there's an error, return the defaultValue
      return defaultValue;
    }
  });

  // Function to update the stored value and sessionStorage
  const setValue = (newValue) => {
    try {
      // Update sessionStorage with the new value
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // If an error occurs while updating sessionStorage, log it
      console.error(err);
    }
    // Update the state with the new value
    setStoredValue(newValue);
  };

  // Return the stored value and the function to update it
  return [storedValue, setValue];
};
