'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipHighlight } from '../app/[locale]/(unauth)/api/room/getPantipHighlight';
/* eslint no-underscore-dangle: 0 */
interface ImageCardProps {
  src?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}

interface Highlight {
  _id?: string;
  name?: string;
  message?: string;
  weight?: number;
  image_url?: string[];
  post_url?: string;
  topic_id?: string;
}

interface HighlightState {
  highlights: Highlight[];
  setHighlights: (highlights: Highlight[]) => void;
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

const PantipHighlight: React.FC = () => {
  const { highlights, fetchHighlights } = useHighlightStore();

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  if (highlights.length === 0) {
    return (
      <div className="relative bg-[#53507c] p-4">
        <div className="mb-4 flex items-center justify-center pt-4">
          <div className="h-8 w-40 animate-pulse rounded bg-[#fbc02d] opacity-50" />
        </div>
        <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="w-64 shrink-0">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="h-40 animate-pulse bg-gray-300" />
                <div className="p-4">
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#53507c] p-4">
      <div className="mb-4 flex items-center justify-center pt-4">
        <h2 className="py-4 text-2xl font-bold text-[#fbc02d]">Highlights</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {highlights.map((highlight) => (
          <a
            key={highlight._id}
            href={highlight.post_url}
            className="col-span-1"
          >
            <ImageCard
              src={highlight.image_url ? highlight.image_url[0] : ''}
              alt={highlight.name}
              title={highlight.name}
              subtitle={highlight.message}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PantipHighlight;
