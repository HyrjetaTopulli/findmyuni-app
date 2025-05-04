import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  interestsResults: any;
  bachelorsResults: any;
  universityResults: any;
  currentQuiz: 'interests' | 'bachelors' | 'university' | null;
  currentQuestion: number;
}

const initialState: QuizState = {
  interestsResults: null,
  bachelorsResults: null,
  universityResults: null,
  currentQuiz: null,
  currentQuestion: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz: (state, action: PayloadAction<QuizState['currentQuiz']>) => {
      state.currentQuiz = action.payload;
      state.currentQuestion = 0;
    },
    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },
    prevQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    saveInterestsResults: (state, action: PayloadAction<any>) => {
      state.interestsResults = action.payload;
    },
    saveBachelorsResults: (state, action: PayloadAction<any>) => {
      state.bachelorsResults = action.payload;
    },
    saveUniversityResults: (state, action: PayloadAction<any>) => {
      state.universityResults = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuiz = null;
      state.currentQuestion = 0;
    },
  },
});

export const {
  setCurrentQuiz,
  nextQuestion,
  prevQuestion,
  saveInterestsResults,
  saveBachelorsResults,
  saveUniversityResults,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;