import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import quizReducer from './slices/quizSlice';
import universityReducer from './slices/universitySlice';
import articleReducer from './slices/articleSlice';
import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    university: universityReducer,
    article: articleReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;