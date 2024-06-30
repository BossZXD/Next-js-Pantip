import React from 'react';

interface ClubCardProps {
  club: {
    id: number;
    name: string;
    is_official: boolean;
  };
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => (
  <a
    href={`https://pantip.com/club/${club.id}`}
    className="block overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl"
  >
    <div className="relative h-48 bg-gray-700">
      <img
        src="https://via.placeholder.com/400x400"
        alt={club.name}
        className="size-full object-cover"
      />
      {club.is_official && (
        <span className="absolute left-2 top-2 rounded-full bg-[#fbc02d] px-2 py-1 text-xs font-semibold text-[#53507c]">
          Official
        </span>
      )}
    </div>
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold text-white">{club.name}</h3>
    </div>
  </a>
);

export default ClubCard;
