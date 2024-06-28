import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Topic {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  timeAgo: string;
}

interface TopicsState {
  topics: Topic[];
}

const initialState: TopicsState = {
  topics: [],
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<Topic[]>) => {
      state.topics = action.payload;
    },
  },
});

export const { setTopics } = topicsSlice.actions;
export default topicsSlice.reducer;