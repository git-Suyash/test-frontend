import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";;

const pages = ['ALL', 'PENDING','APPROVED'];

function NavbarComponent2() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-transparent">
      <nav className="bg-transparent shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black p-2 rounded-md focus:outline-none"
              >
                <IoMenu />
              </button>
            </div>

            {/* Desktop navigation links */}
            <div className="hidden md:flex md:items-center">
              {pages.map((page) => (
                <button
                  key={page}
                  className="text-black px-3 py-2 text-sm font-medium hover:bg-gray-200"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg">
            <div className="px-2 py-1">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={toggleMenu}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavbarComponent2;
