import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        {/* Outer Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        {/* Inner Circle */}
        <div className="absolute inset-2 rounded-full border-4 border-secondary border-t-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loading;
