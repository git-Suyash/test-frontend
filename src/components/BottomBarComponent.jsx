import React from 'react';
import sdclogo from '../images/SDC-Logo-White.webp';

export const BottomBarComponent = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto flex items-center justify-center py-4">
                <img src={sdclogo} alt="SDC Logo" className="h-10 mr-4" />
                <div>Bottom Bar Content Here</div>
            </div>
        </footer>
    );
};
