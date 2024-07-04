import React, { useState } from "react";
import profileImage from "../images/user.png";
import { LogoComponent } from "./LogoComponent";

const settings1 = ["Add", "Update"];

export const AdminNavbarComponent = ({ setIsUpdateSelected }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNavUserMenuOpen, setIsNavUserMenuOpen] = useState(false);

    const handleToggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleToggleNavUserMenu = () => {
        setIsNavUserMenuOpen(!isNavUserMenuOpen);
    };

    const handleUpdateClick = () => {
        setIsUpdateSelected(true);
        setIsNavUserMenuOpen(false);
    };

    const handleAddClick = () => {
        setIsUpdateSelected(false);
        setIsNavUserMenuOpen(false);
    };

    return (
        <div>
            <nav className="bg-orange-500 bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <LogoComponent />
                            <div className="hidden md:flex space-x-4">
                                <button
                                    onClick={handleToggleNavUserMenu}
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Users
                                </button>
                                <button
                                    onClick={handleToggleUserMenu}
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Notesheet
                                </button>
                            </div>
                        </div>
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    onClick={handleToggleUserMenu}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={profileImage}
                                        alt="User"
                                    />
                                </button>
                            </div>
                            {isUserMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                    <button
                                        onClick={handleToggleUserMenu}
                                        className="block px-4 py-2 text-sm text-gray-700"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleToggleUserMenu}
                                        className="block px-4 py-2 text-sm text-gray-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                            {isNavUserMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                    {settings1.map((setting) => (
                                        <button
                                            key={setting}
                                            onClick={setting === "Update" ? handleUpdateClick : handleAddClick}
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            {setting}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                .formback1 {
                    margin: 3%;
                }

                .formback2 {
                    margin: 2%;
                    padding: 2%;
                    border: 1px solid black;
                    width: 60%;
                }

                @media only screen and (max-width: 768px) {
                    .formback2 {
                        min-width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
};