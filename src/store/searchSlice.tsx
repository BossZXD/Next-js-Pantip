// store/searchSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      // Disable the rule for specific lines
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
