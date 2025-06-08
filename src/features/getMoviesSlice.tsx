import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/Movie';

export interface SetAllMoviesInterface {
  items: Movie[];
  error: boolean;
  loaded: boolean;
  searchQuery: string;
  sortAscending: boolean;
}

const initialState: SetAllMoviesInterface = {
  items: [],
  error: false,
  loaded: false,
  searchQuery: '',
  sortAscending: true,
};

export const getMoviesAsync = createAsyncThunk<Movie[]>('movies/fetchAll', async () => {
  const response = await fetch('/api/movies.json');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data;
});

export const getMoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.items.push(action.payload);
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
  extraReducers: builder => {
    builder
      .addCase(getMoviesAsync.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(getMoviesAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.error = false;
      })
      .addCase(getMoviesAsync.rejected, state => {
        state.loaded = true;
        state.error = true;
      });
  },
});

export default getMoviesSlice.reducer;
export const { addMovie, removeMovie, setSearchQuery, sortByTitle } = getMoviesSlice.actions;
