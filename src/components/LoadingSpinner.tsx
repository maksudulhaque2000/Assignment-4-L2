import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className="text-xl text-gray-700">Loading data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
