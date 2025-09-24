import React from "react";
import { Briefcase } from "lucide-react"; // Import an icon

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-sm p-4 mb-8">
      <div className="container mx-auto flex items-center justify-center">
        <Briefcase className="h-8 w-8 text-blue-600 mr-3" /> {/* Icon */}
        <h1 className="text-3xl font-bold text-gray-800">Global Scale Accountants</h1>
      </div>
    </nav>
  );
};