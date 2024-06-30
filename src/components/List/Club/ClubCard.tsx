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
    className="block overflow-hidden rounded-xl bg-[#53507c]/50 shadow-lg transition-all duration-300 hover:bg-[#53507c]/70 hover:shadow-xl"
  >
    <div className="relative aspect-square">
      <img
        src="https://via.placeholder.com/400x400"
        alt={club.name}
        className="transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="line-clamp-2 text-lg font-semibold text-white">
        {club.name}
      </h3>
    </div>
  </a>
);

export default ClubCard;
