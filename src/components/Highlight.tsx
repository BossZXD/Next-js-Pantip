'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipHighlight } from '../app/[locale]/(unauth)/api/room/getPantipHighlight';
/* eslint no-underscore-dangle: 0 */
interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  width?: number;
  height?: number;
}

interface HighlightState {
  highlights: Array<{
    _id?: string;
    name: string;
    message: string;
    weight: number;
    image_url: string[];
    post_url: string;
  }>;
  setHighlights: (highlights: HighlightState['highlights']) => void;
  fetchHighlights: () => Promise<void>;
}

const useHighlightStore = create<HighlightState>((set) => ({
  highlights: [],
  setHighlights: (highlights) => set({ highlights }),
  fetchHighlights: async () => {
    try {
      const result = await getPantipHighlight();
      set({ highlights: result.data });
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  },
}));

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  title,
  subtitle,
  width = 400,
  height = 400,
}) => (
  <div className="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="h-48 w-full object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 text-white">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs">{subtitle}</p>
    </div>
  </div>
);

const Highlight: React.FC = () => {
  const { highlights, fetchHighlights } = useHighlightStore();

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  return (
    <div className="relative bg-[#53507c] p-4">
      <div className="mb-4 flex items-center justify-center pt-4">
        <h2 className="py-4 text-2xl font-bold text-white">Highlights</h2>
      </div>
      <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
        {highlights.map((highlight) => (
          <ImageCard
            key={highlight._id}
            src={highlight.image_url[0] || ''}
            alt={highlight.name}
            title={highlight.name}
            subtitle={highlight.message}
          />
        ))}
      </div>
    </div>
  );
};

export default Highlight;
