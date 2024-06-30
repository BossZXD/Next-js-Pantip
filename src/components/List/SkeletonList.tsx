import React from 'react';

const Skeleton: React.FC = () => (
  <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg">
    <div className="h-48 animate-pulse bg-gray-600" />
    <div className="p-4">
      <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-600" />
    </div>
  </div>
);

export default Skeleton;
