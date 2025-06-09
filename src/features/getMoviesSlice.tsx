// src/features/getMoviesSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/Movie';

export interface SetAllMoviesInterface {
  items: Movie[];
  error: boolean;
  loaded: boolean;
  searchQuery: string;
  sortAscending: boolean;
}

const initialState: SetAllMoviesInterface = {
  items: JSON.parse(localStorage.getItem('movies') || '[]'),
  error: false,
  loaded: false,
  searchQuery: '',
  sortAscending: true,
};

export const getMoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.items.push(action.payload);
    },
    addManyMovies: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    removeMovie: (state, action) => {
      state.items = state.items.filter(movie => movie.title !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    sortByTitle: state => {
      state.items.sort((a, b) =>
        state.sortAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
      state.sortAscending = !state.sortAscending;
    },
  },
});

export default getMoviesSlice.reducer;
export const { addMovie, addManyMovies, removeMovie, setSearchQuery, sortByTitle } =
  getMoviesSlice.actions;
