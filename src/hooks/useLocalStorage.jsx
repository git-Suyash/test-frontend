import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  // Initialize state with the value retrieved from localStorage or the defaultValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      // If there's an error, return the defaultValue
      return defaultValue;
    }
  });

  // Function to update the stored value and localStorage
  const setValue = (newValue) => {
    try {
      // Update localStorage with the new value
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      // If an error occurs while updating localStorage, log it
      console.error(err);
    }
    // Update the state with the new value
    setStoredValue(newValue);
  };

  // Return the stored value and the function to update it
  return [storedValue, setValue];
};
