import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await fetch (`https://api.themoviedb.org/3/movie/${movieId}?api_key=9b5a765865f5d87b08d3223dd5ef5a6c`);
    return response.json();
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    isLoading: false,
    details: null,
    isError: false,
    watchlist: [],
    favorites: [],
    selectedMovie: null
  },
  reducers: {
    addToWatchlist(state, action) {
      const movieId = action.payload;
      if (!state.watchlist.includes(movieId)) {
        state.watchlist.push(movieId);
      }
    },
    addToFavorites(state, action) {
      const movieId = action.payload;
      if (!state.favorites.includes(movieId)) {
        state.favorites.push(movieId);
      }
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
        state.isError = false;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectMovieDetails = (state) => state.movies.details;
export const selectWatchlist = (state) => state.movies.watchlist;
export const selectFavorites = (state) => state.movies.favorites;
export const selectSelectedMovie = (state) => state.movies.selectedMovie;

export const { addToWatchlist, addToFavorites, setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;