import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm p-4 mb-8">
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-800">Global Scale Accountants</h1>
      </div>
    </nav>
  );
};