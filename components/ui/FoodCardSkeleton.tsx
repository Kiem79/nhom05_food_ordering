import React from "react";

const FoodCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-foodie shadow-sm overflow-hidden">
      
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="p-4">
        
        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-3 animate-pulse" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          
          {/* Price */}
          <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse" />

          {/* Button */}
          <div className="h-9 w-24 bg-gray-200 rounded-foodie animate-pulse" />
        </div>

      </div>
    </div>
  );
};

export default FoodCardSkeleton;