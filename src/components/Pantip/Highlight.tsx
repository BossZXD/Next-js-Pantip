'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipHighlight } from '../../app/[locale]/(unauth)/api/room/getPantipHighlight';
import { Card } from '../Card';

/* eslint no-underscore-dangle: 0 */

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
    <div className="relative mt-4 rounded-3xl border border-zinc-100/10 bg-gradient-to-br from-[#53507c] to-[#3f3d5e] p-8 shadow-2xl dark:border-zinc-700/40">
      <div className="mb-8 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-[#fbc02d]">Highlights</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
        {highlights.map((highlight) => (
          <a href={highlight.post_url} key={highlight._id}>
            <Card
              as="li"
              key={highlight._id}
              className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="relative z-10 aspect-square overflow-hidden">
                <Image
                  src={highlight.image_url ? highlight.image_url[0] : ''}
                  alt=""
                  height={400}
                  width={400}
                  className="size-full rounded-md"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-white">
                  {highlight.name}
                </h2>
                <Card.Description>{highlight.message}</Card.Description>
                <p className="relative z-10 mt-4 flex text-sm font-medium text-[#fbc02d] transition group-hover:text-white">
                  <span>Read More</span>
                </p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};
export default PantipHighlight;
