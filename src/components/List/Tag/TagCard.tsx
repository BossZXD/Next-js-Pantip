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
    className="block overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl"
  >
    <div className="relative h-48 bg-gray-700">
      <img
        src="https://via.placeholder.com/400x400"
        alt={tag.name}
        className="size-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold text-white">{tag.name}</h3>
    </div>
  </a>
);

export default TagCard;
