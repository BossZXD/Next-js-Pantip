import React from 'react';

interface TagCardProps {
  tag: {
    id: number;
    name: string;
    slug: string;
  };
}

const TagCard: React.FC<TagCardProps> = ({ tag }) => (
  <a
    href={`https://pantip.com/tag/${tag.slug}`}
    className="block overflow-hidden rounded-xl bg-[#53507c]/50 shadow-lg transition-all duration-300 hover:bg-[#53507c]/70 hover:shadow-xl"
  >
    <div className="relative aspect-square">
      <img
        src="https://via.placeholder.com/400x400"
        alt={tag.name}
        className="transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold text-white">{tag.name}</h3>
    </div>
  </a>

);

export default TagCard;
