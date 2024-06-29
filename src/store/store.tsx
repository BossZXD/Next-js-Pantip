import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import topicsReducer from "./topicsSlice";

interface HighlightState {
  highlights: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  }>;
}

const initialState: HighlightState = {
  highlights: [],
};

const highlightSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {
    setHighlights(state, action: PayloadAction<HighlightState["highlights"]>) {
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
    highlight: highlightSlice.reducer,
    topics: topicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
