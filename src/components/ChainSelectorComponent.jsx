import React, { useState } from 'react';

const ChainSelector = ({ availableOptions, onChange, getOptionLabel, initialOptions }) => {
  initialOptions = initialOptions ? initialOptions.filter((option) => option != null) : [];
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const handleOptionChange = (newOptions) => {
    setSelectedOptions(newOptions);
    onChange && onChange(newOptions);
    setIsMenuOpen(false); // Close the menu after selecting an option
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full relative" onMouseLeave={closeMenu}>
      <input
        type="text"
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="Search or select options"
        onClick={toggleMenu} // Open/close menu when input is clicked
      />
      {isMenuOpen && (
        <ul
          className="absolute z-10 w-full py-1 mt-1 bg-white rounded-md shadow-lg border border-gray-200"
          onMouseEnter={() => setIsMenuOpen(true)}>
          {availableOptions.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
              onClick={() => handleOptionChange([...selectedOptions, option])}>
              <div className="flex items-center justify-between p-2 bg-white rounded-md shadow-md">
                <span className="block text-sm font-normal text-gray-900">
                  {getOptionLabel(option.userName)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap mt-2">
        {selectedOptions.map((option, index) => (
          <div key={index} className="mr-2 mb-2">
            <span className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-full">
              #{index + 1} : {getOptionLabel(option.userName)}
              <button
                type="button"
                className="ml-2 text-sm font-medium leading-none text-gray-900 hover:text-red-500 focus:outline-none"
                onClick={() =>
                  handleOptionChange(
                    selectedOptions.filter((item, idx) => idx !== index)
                  )
                }>
                &times;
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChainSelector;