'use client';

import React from 'react';
import { create } from 'zustand';

import { getPantipTagHit } from '@/app/[locale]/(unauth)/api/room/getPantipTagHit';

import Skeleton from '../SkeletonList';
import TagCard from './TagCard';

interface TagHit {
  id: number;
  name: string;
  slug: string;
  [key: string]: any;
}

interface TagsState {
  tags: TagHit[];
  setTags: (tags: TagsState['tags']) => void;
  fetchTags: () => Promise<void>;
}

const useTagsStore = create<TagsState>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  fetchTags: async () => {
    try {
      const result = await getPantipTagHit();
      const limitedTags = result.data.slice(0, 4);
      set({ tags: limitedTags });
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  },
}));

export default function PantipTagHit() {
  const { tags, fetchTags } = useTagsStore();
  const skeletonIds = Array.from(
    { length: 4 },
    (_, i) => `skeleton-${i}-${Date.now()}`,
  );

  React.useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <div className="container mx-auto mt-12 rounded-2xl border border-zinc-100 px-4 py-8 shadow-xl dark:border-zinc-700/40">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#fbc02d]">Pantip Tag Hits</h2>
        <a
          href="https://pantip.com/tags"
          className="rounded-full bg-[#fbc02d] px-6 py-2 text-sm font-semibold text-[#53507c] transition-colors hover:bg-[#fbc02d]/80"
        >
          ดูทั้งหมด
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tags.length === 0
          ? skeletonIds.map((id) => <Skeleton key={id} />)
          : tags.map((tag) => <TagCard key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
}
