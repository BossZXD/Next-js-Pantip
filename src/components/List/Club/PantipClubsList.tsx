'use client';

import React from 'react';
import { create } from 'zustand';

import { getPantipClubs } from '@/app/[locale]/(unauth)/api/room/getPantipClub';

import Skeleton from '../SkeletonList';
import ClubCard from './ClubCard';

interface Club {
  id: number;
  name: string;
  slug: string;
  is_official: boolean;
  is_active: boolean;
  has_icon: boolean;
}

interface ClubsState {
  clubs: Club[];
  setClubs: (clubs: ClubsState['clubs']) => void;
  fetchClubs: () => Promise<void>;
}

const useClubsStore = create<ClubsState>((set) => ({
  clubs: [],
  setClubs: (clubs) => set({ clubs }),
  fetchClubs: async () => {
    try {
      const result = await getPantipClubs();
      const limitedClubs = result.data.slice(0, 4);
      set({ clubs: limitedClubs });
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  },
}));

export default function PantipClubsList() {
  const { clubs, fetchClubs } = useClubsStore();
  const skeletonIds = Array.from(
    { length: 4 },
    (_, i) => `skeleton-${i}-${Date.now()}`,
  );

  React.useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#fbc02d]">Pantip Clubs</h2>
        <a
          href="https://pantip.com/clubs"
          className="rounded-full bg-[#fbc02d] px-6 py-2 text-sm font-semibold text-[#53507c] transition-colors hover:bg-[#fbc02d]/80"
        >
          ดูทั้งหมด
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clubs.length === 0
          ? skeletonIds.map((id) => <Skeleton key={id} />)
          : clubs.map((club) => <ClubCard key={club.id} club={club} />)}
      </div>
    </div>
  );
}
