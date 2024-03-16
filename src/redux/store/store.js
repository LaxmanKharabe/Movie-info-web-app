import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../slice/popularSlice';
import authReducer from '../slice/authSlice'
import movieReducer from '../slice/movieSlice'
export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer,
        movies: movieReducer,
    },
});
  