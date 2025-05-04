import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types';

interface ArticleState {
  articles: Article[];
  selectedArticle: Article | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  isLoading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'article/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll return mock data
      const articles: Article[] = [
        {
          id: '1',
          title: 'Internship Hotspots: Where Albania’s Private-Uni Students Get Hired',
          content: 'Internships aren’t just résumé fillers—they are the fastest route from classroom to career. ',
          image: '/images/article1.png',
          date: '2025-04-15',
          universityId: '1',
          category: 'Academic Programs',
        },
        {
          id: '2',
          title: 'Surviving Albania’s Two Exam-Season Styles',
          content: 'When finals roll around, private universities in Tirana follow one of two distinct rhythms.',
          image: '/images/article2.png',
          date: '2025-04-10',
          universityId: '2',
          category: 'Research',
        },
        {
          id: '3',
          title: 'Best Green Corners to Study: Ranking Private Campuses',
          content: 'Green campus spaces aren’t just Instagram fodder—they boost concentration by up to 12 %.',
          image: '/images/article3.png',
          date: '2025-04-05',
          category: 'Advice',
        },
      ];
      return articles;
    } catch (error) {
      return rejectWithValue('Failed to fetch articles');
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;