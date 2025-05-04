import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CalendarEvent } from '../../types';

interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  events: [],
  selectedDate: new Date(),
  isLoading: false,
  error: null,
};

export const fetchCalendarEvents = createAsyncThunk(
  'calendar/fetchCalendarEvents',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll return mock data
      const events: CalendarEvent[] = [
        {
          id: '1',
          title: 'Harvard Open Day',
          date: new Date('2025-06-15'),
          type: 'openDay',
          description: 'Visit Harvard University for a campus tour and meet with faculty.',
          universityId: '1',
        },
        {
          id: '2',
          title: 'Oxford Application Deadline',
          date: new Date('2025-07-01'),
          type: 'applicationDeadline',
          description: 'Last day to submit your application to Oxford University.',
          universityId: '2',
        },
        {
          id: '3',
          title: 'Harvard Scholarship Exam',
          date: new Date('2025-06-20'),
          type: 'scholarshipExam',
          description: 'Take the Harvard scholarship examination for a chance to win a full scholarship.',
          universityId: '1',
        },
      ];
      return events;
    } catch (error) {
      return rejectWithValue('Failed to fetch calendar events');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedDate, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;