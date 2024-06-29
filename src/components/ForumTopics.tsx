"use client";

import React, { useEffect, useState } from "react";
import { getPantipTopic } from "@/app/[locale]/(unauth)/api/room/getPantipTopic";
import create from "zustand";

interface TopicsState {
  Topics: {
    room_id?: number;
    room_name_en?: string;
    room_name_th?: string;
    topics?: {
      topic_id?: number;
      topic_type?: number;
      title?: string;
      thumbnail_url?: string | null;
      views_count?: number;
      comments_count?: number;
      votes_count?: number;
      author?: {
        id?: number;
        name?: string;
      };
      created_time?: string;
      tags?: {
        name?: string;
        slug?: string;
      }[];
      category?: string;
    }[];
    type?: string;
  }[];
  setTopic: (topics: TopicsState["Topics"]) => void;
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
      console.error("Error fetching Topics:", error);
    }
  },
}));

const ForumTopics: React.FC = () => {
  const { Topics, fetchTopic } = useTopicStore();
  const [expandedViews, setExpandedViews] = useState<{ [key: number]: boolean }>({});
  const [visibleTopics, setVisibleTopics] = useState<{ [key: number]: TopicsState["Topics"][0]["topics"] }>({});

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  useEffect(() => {
    const initialTopicsCount = window.innerWidth < 768 ? 4 : 10;
    const newVisibleTopics: { [key: number]: TopicsState["Topics"][0]["topics"] } = {};
    Topics.forEach((topic, index) => {
      newVisibleTopics[index] = topic.topics?.slice(0, initialTopicsCount) || [];
    });
    setVisibleTopics(newVisibleTopics);
  }, [Topics]);

  const handleToggleView = (index: number) => {
    setExpandedViews(prev => {
      const newExpandedViews = { ...prev };
      newExpandedViews[index] = !prev[index];
      return newExpandedViews;
    });

    setVisibleTopics(prev => {
      const newVisibleTopics = { ...prev };
      if (expandedViews[index]) {
        const initialTopicsCount = window.innerWidth < 768 ? 4 : 10;
        newVisibleTopics[index] = Topics[index].topics?.slice(0, initialTopicsCount) || [];
      } else {
        newVisibleTopics[index] = Topics[index].topics || [];
      }
      return newVisibleTopics;
    });
  };

  if (Topics.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-[#53507c]">
      <div className="container mx-auto px-4 py-8">
        {Topics.map((topic, index) => (
          <div key={index} className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              {topic.room_name_th != null ? topic.room_name_th : topic.tag_name ? topic.tag_name : ""}
            </h2>
            <div className="expanding-container overflow-hidden transition-[height] duration-500 ease-in-out">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {visibleTopics[index]?.map((subTopic) => (
                  <a
                    href={`https://pantip.com/topic/${subTopic.topic_id}`}
                    key={subTopic.topic_id}
                    className="rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-lg"
                  >
                    <h3 className="mb-2 text-lg font-semibold text-[#53507c]">
                      {subTopic.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-600">
                      โดย: {subTopic.author?.name} | จำนวนผู้เข้าชม: {subTopic.views_count} | ความคิดเห็น: {subTopic.comments_count}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {subTopic.tags?.map((tag) => (
                        <span key={tag.slug} className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-6 text-center">
              <a href={`https://pantip.com/forum/${topic.room_name_en}`}
                className="rounded-lg bg-white px-4 py-2 text-[#53507c] transition-colors duration-300 hover:bg-gray-100">
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