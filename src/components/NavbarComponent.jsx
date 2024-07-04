import * as React from 'react';
import profileImage from "../images/user.png";
import { Link } from "react-router-dom";

function NavbarComponent({ pages, settings, user, logout }) {
  const [navOpen, setNavOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleOpenNavMenu = () => {
    setNavOpen(!navOpen);
  };

  const handleOpenUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleCloseNavMenu = () => {
    setNavOpen(false);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/home/created"
                className="text-white font-mono font-bold text-lg md:text-xl">
                NMS
              </Link>
            </div>
            <div className="hidden md:block ml-4">
              <div className="flex items-baseline space-x-4">
                {pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={page.onClick}
                    className="text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-white hover:text-orange-400">
                    {page.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={handleOpenNavMenu}
              className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div className="relative ml-auto">
            <button
              onClick={handleOpenUserMenu}
              className="flex text-sm rounded-full focus:outline-none">
              <img
                className="h-8 w-8 rounded-full ml-2"
                src={profileImage}
                alt=""
              />
            </button>
            {userMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                {settings.map((setting, index) => (
                  <button
                    key={index}
                    onClick={setting.onClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition duration-300 ease-in-out">
                    {setting.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={page.onClick}
                className="text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-white hover:text-orange-400">
                {page.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarComponent;