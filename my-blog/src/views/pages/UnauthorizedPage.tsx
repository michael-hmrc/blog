import React from 'react';
import Navbar from '../components/navigation_bar/NavBar';

const UnauthorizedPage: React.FC = () => {
    return (
        <div>
            < Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-semibold text-red-600">You are not authorized to view this page.</h1>
            </div >
        </div>
    );
};

export default UnauthorizedPage;
