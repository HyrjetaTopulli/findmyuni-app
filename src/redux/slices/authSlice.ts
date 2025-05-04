// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful login
      const user = { 
        id: '1', 
        name: 'John', 
        surname: 'Doe', 
        email, 
        password: '',
        // Initialize with empty quiz results object
        quizResults: {
          interests: null,
          bachelors: null,
          university: null
        }
      };
      const token = 'fake-jwt-token';
      return { user, token };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: Omit<User, 'id'>, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      const user = { 
        ...userData, 
        id: '1',
        // Initialize with empty quiz results object
        quizResults: {
          interests: null,
          bachelors: null,
          university: null
        }
      };
      const token = 'fake-jwt-token';
      return { user, token };
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    updateUserQuizResults: (state, action) => {
      if (state.user) {
        state.user.quizResults = {
          ...state.user.quizResults,
          ...action.payload
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUserQuizResults } = authSlice.actions;
export default authSlice.reducer;