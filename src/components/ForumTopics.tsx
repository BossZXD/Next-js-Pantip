'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setTopics } from '../store/topicsSlice';

const ForumTopics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const topics = useSelector((state: RootState) => state.topics.topics);
  const [visibleTopics, setVisibleTopics] = useState(topics.slice(0, 10));
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchedTopics = [
      {
        topic_id: 42810545,
        title: 'มีใครเคยเห็น ผญ ที่ทำงานหนัก แต่หน้าตายังสดใสทั้งวันบ้างคะ',
        author: 'สมาชิกหมายเลข 7958967',
        replies: 1,
        views: 0,
        timeAgo: '2024-06-28T15:32:17Z',
      },
      {
        topic_id: 42810530,
        title: 'บริษัทไลอ้อน #ชลบุรี หางาน ศรีราชา เครือสหพัฒน์',
        author: 'สมาชิกหมายเลข 6687884',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:18:15Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
      {
        topic_id: 42810557,
        title: 'ทำไมคนขายของในติกตอกรวยจัง',
        author: 'สมาชิกหมายเลข 6872113',
        replies: 0,
        views: 0,
        timeAgo: '2024-06-28T15:41:45Z',
      },
    ];

    dispatch(setTopics(fetchedTopics));
  }, [dispatch]);

  useEffect(() => {
    const updateVisibleTopics = () => {
      if (typeof window !== 'undefined') {
        const maxTopics = window.innerWidth < 768 ? 4 : 10;
        setVisibleTopics(topics.slice(0, maxTopics));
        setShowMore(topics.length > maxTopics);
      }
    };

    updateVisibleTopics();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateVisibleTopics);
      return () => window.removeEventListener('resize', updateVisibleTopics);
    }
  }, [topics]);
  
  const handleShowMore = () => {
    setVisibleTopics(topics);
    setShowMore(false);
  };

  const handleShowLess = () => {
    setVisibleTopics(window.innerWidth < 768 ? topics.slice(0, 4) : topics.slice(0, 10));
    setShowMore(true);
  };

  return (
    <div className="flex items-center justify-center bg-[#53507c] p-8 sm:p-12 lg:p-16">
      <div className="relative w-full max-w-5xl bg-white rounded-lg p-6 sm:p-8 shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800">Forum Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleTopics.map((topic) => (
            <a href={`https://pantip.com/topic/${topic.topic_id}`} key={topic.topic_id} target="_blank" rel="noopener noreferrer" className="flex flex-col p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-md sm:text-lg font-bold text-gray-800">{topic.title}</h3>
              <p className="text-sm text-gray-600">by {topic.author}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{topic.replies} replies</span>
                <span>{topic.views} views</span>
              </div>
              <span className="text-xs text-gray-400 mt-1">{new Date(topic.timeAgo).toLocaleString()}</span>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          {topics.length > (window.innerWidth < 768 ? 4 : 10) && showMore && (
            <button
              className="px-4 py-2 bg-[#53507c] text-white rounded-lg hover:bg-[#41405d] transition-colors duration-300"
              onClick={handleShowMore}
            >
              ดูเพิ่มเติม
            </button>
          )}
          {!showMore && (
            <button
              className="px-4 py-2 bg-[#53507c] text-white rounded-lg hover:bg-[#41405d] transition-colors duration-300"
              onClick={handleShowLess}
            >
              ดูน้อยลง
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumTopics;
