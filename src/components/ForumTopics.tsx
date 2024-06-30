'use client';

import React, { useEffect } from 'react';
import { create } from 'zustand';

import { getPantipTopic } from '@/app/[locale]/(unauth)/api/room/getPantipTopic';

interface Author {
  id?: number;
  name?: string;
}

interface Tag {
  name?: string;
  slug?: string;
}

interface SubTopic {
  topic_id?: number;
  topic_type?: number;
  title?: string;
  thumbnail_url?: string | null;
  views_count?: number;
  comments_count?: number;
  votes_count?: number;
  author?: Author;
  created_time?: string;
  tags?: Tag[];
  category?: string;
}

interface Topic {
  room_id?: number;
  room_name_en?: string;
  room_name_th?: string;
  topics?: SubTopic[];
  tag_name?: string;
  type?: string;
}

interface TopicsState {
  Topics: Topic[];
  setTopic: (topics: Topic[]) => void;
  fetchTopic: () => Promise<void>;
}

const useTopicStore = create<TopicsState>((set) => ({
  Topics: [],
  setTopic: (Topics) => set({ Topics }),
  fetchTopic: async () => {
    try {
      const result = await getPantipTopic();
      set({ Topics: result.data });
    } catch (error) {
      console.error('Error fetching Topics:', error);
    }
  },
}));

const SkeletonLoader: React.FC = () => (
  <div className="w-full bg-[#53507c]">
    <div className="container mx-auto px-4 py-8">
      {[1, 2, 3].map((topic) => (
        <div key={topic} className="mb-8">
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded bg-[#fbc02d] opacity-50" />
          <div className="expanding-container overflow-hidden transition-[height] duration-500 ease-in-out">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((subTopic) => (
                <div
                  key={subTopic}
                  className="rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-2 h-6 animate-pulse rounded bg-gray-300" />
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((tag) => (
                      <div
                        key={tag}
                        className="h-6 w-16 animate-pulse rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="inline-block h-10 w-32 animate-pulse rounded-lg bg-white" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ForumTopics: React.FC = () => {
  const { Topics, fetchTopic } = useTopicStore();

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  if (Topics.length === 0) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full bg-[#53507c]">
      <div className="container mx-auto px-4 py-8">
        {Topics.map((topic) => (
          <div key={topic.room_id} className="mb-8">
            <div className="inline-flex items-center pb-4">
              {topic.room_name_en && (
                <img
                  src={`https://ptcdn.info/mobile/icon_room/pt-forum-${topic.room_name_en}.svg`}
                  alt={topic.room_name_en}
                  className="size-10 text-white"
                />
              )}
              <h2 className="pl-2 text-2xl font-bold text-[#fbc02d]">
                {topic.room_name_th ?? topic.tag_name ?? ''}
              </h2>
            </div>
            <div className="expanding-container overflow-hidden transition-[height] duration-500 ease-in-out">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topic.topics?.map((subTopic) => (
                  <a
                    href={`https://pantip.com/topic/${subTopic.topic_id}`}
                    key={subTopic.topic_id}
                    className="rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-lg"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-[#53507c]">
                      {subTopic.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      โดย: {subTopic.author?.name} | จำนวนผู้เข้าชม:{' '}
                      {subTopic.views_count} | ความคิดเห็น:{' '}
                      {subTopic.comments_count}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {subTopic.tags?.map((tag) => (
                        <span
                          key={tag.slug}
                          className="rounded-full bg-gray-200 px-2 py-1 text-xs"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href={`https://pantip.com/forum/${topic.room_name_en}`}
                className="rounded-lg bg-white px-4 py-2 text-[#53507c] transition-colors duration-300 hover:bg-gray-100"
              >
                แสดงเพิ่มเติม
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumTopics;
