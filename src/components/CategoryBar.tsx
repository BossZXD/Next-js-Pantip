'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { create } from 'zustand';

import { getPantipCategories } from '@/app/[locale]/(unauth)/api/category/getCategory';

interface Category {
  id: number;
  name: string;
  name_en: string;
  description?: string;
  is_pinned: boolean;
  link_url: string;
  order: number | null;
  pinned_time: number | null;
  room_icon_url: string;
  slug: string;
}

interface CategoriesState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
}

const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
  fetchCategories: async () => {
    try {
      const result = await getPantipCategories();
      set({ categories: result.data });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
}));

const CategoryBar: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative flex justify-center bg-[#53507c] p-4">
      <button
        type="button"
        aria-label="left"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
      >
        <ChevronLeft size={24} className="text-gray-600" />
      </button>
      <button
        type="button"
        aria-label="right"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-10 ml-2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
      >
        <ChevronRight size={24} className="text-gray-600" />
      </button>
      <div ref={scrollRef} className="flex space-x-8 overflow-hidden">
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 flex-col items-center space-y-2"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-[#53507c] shadow-xl">
              {category.room_icon_url ? (
                <img
                  src={category.room_icon_url}
                  alt={category.name}
                  className="size-12 rounded-full"
                />
              ) : (
                <span className="text-white">?</span>
              )}
            </div>
            <span className="text-xs text-white">{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
