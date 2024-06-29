import type { PayloadAction } from '@reduxjs/toolkit';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

interface HighlightState {
  highlights: Array<{
    _id: number;
    name: string;
    message: string;
    weight: number;
    image_url: string;
    post_url: string;
  }>;
}

const initialState: HighlightState = {
  highlights: [],
};

const highlightSlice = createSlice({
  name: 'highlight',
  initialState,
  reducers: {
    setHighlights(state, action: PayloadAction<HighlightState['highlights']>) {
      // Disable the rule for specific lines
      // eslint-disable-next-line no-param-reassign
      state.highlights = action.payload;
    },
  },
});

export const { setHighlights } = highlightSlice.actions;

export const store = configureStore({
  reducer: {
    search: searchReducer,
    highlight: highlightSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
