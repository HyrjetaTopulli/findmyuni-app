import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

// Use this typed version of useDispatch to avoid TypeScript errors with async thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();