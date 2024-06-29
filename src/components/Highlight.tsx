"use client";

import React, { useEffect, useRef } from "react";
import { getPantipHighlight } from "../app/[locale]/(unauth)/api/room/getPantipHighlight";
import create from "zustand";

interface HighlightState {
  highlights: Array<{
    _id: string;
    name: string;
    message: string;
    weight: number;
    image_url: string[];
    post_url: string;
  }>;
  setHighlights: (highlights: HighlightState["highlights"]) => void;
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
      console.error("Error fetching highlights:", error);
    }
  },
}));

const ImageCard = ({ src, alt, title, subtitle }) => (
  <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="w-full h-48 object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
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
      <div className="flex items-center justify-center pt-4 mb-4">
        <h2 className="text-2xl font-bold text-white py-4">Highlights</h2>
      </div>
      <div className="overflow-x-auto flex justify-center space-x-4 pb-4">
        {highlights.map((highlight) => (
          <ImageCard
            key={highlight._id}
            src={highlight.image_url[0] || '/placeholder.jpg'}
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