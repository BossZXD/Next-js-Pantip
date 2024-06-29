'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Topic {
  topic_id: number;
  topic_type: number;
  title: string;
  thumbnail_url: string | null;
  views_count: number;
  comments_count: number;
  author: {
    name: string;
  };
  tags: { slug: string; name: string }[];
  category: string;
}

interface ForumData {
  room_id: number;
  room_name_th: string;
  room_name_en: string;
  type: string;
  topics: Topic[];
}

interface ForumTopicsProps {
  data: ForumData;
}
const ForumTopics: React.FC<ForumTopicsProps> = ({ data }) => {
  const [expandedView, setExpandedView] = useState<boolean>(false);
  const [visibleTopics, setVisibleTopics] = useState<Topic[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<string>('auto');

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const initialTopicsCount = isMobile ? 4 : 10;
    setVisibleTopics(data.topics.slice(0, initialTopicsCount));
  }, [data.topics, isMobile]);

  useEffect(() => {
    if (containerRef.current) {
      const height = expandedView ? `${containerRef.current.scrollHeight}px` : '800px';
      setContainerHeight(height);
    }
  }, [expandedView, visibleTopics]);

  const handleToggleView = () => {
    if (expandedView) {
      const initialTopicsCount = isMobile ? 4 : 10;
      setVisibleTopics(data.topics.slice(0, initialTopicsCount));
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setVisibleTopics(data.topics);
    }
    setExpandedView(!expandedView);
  };

  return (
    <div className="w-full bg-[#53507c]">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{data.room_name_th}</h2>
        <div 
          ref={containerRef}
          className="expanding-container overflow-hidden transition-[height] duration-500 ease-in-out"
          style={{ height: containerHeight }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTopics.map((topic) => (
              <a href={`https://pantip.com/topic/${topic.topic_id}`} key={topic.topic_id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold mb-2 text-[#53507c]">{topic.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  โดย: {topic.author.name} | จำนวนผู้เข้าชม: {topic.views_count} | ความคิดเห็น: {topic.comments_count}
                </p>
                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span key={tag.slug} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                      {tag.name}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            className="px-4 py-2 bg-white text-[#53507c] rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={handleToggleView}
          >
            {expandedView ? 'แสดงน้อยลง' : 'แสดงเพิ่มเติม'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumTopics;