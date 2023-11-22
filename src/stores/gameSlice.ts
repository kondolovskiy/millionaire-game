import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Answer = {
  answer: String,
  isCorrect: Boolean
}

type Questions = {
  question: String,
  answers: Array<Answer>,
  reward: number,
}

export interface GameState {
  currentQuestionIndex: number;
  totalReward: number;
  isGameOver: boolean;
  questions: Array<Questions>;
}

const initialState: GameState = {
  currentQuestionIndex: 0,
  totalReward: 0,
  isGameOver: false,
  questions: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Questions[]>) => {
      state.questions = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<number>) => {
      const selectedAnswerIndex = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];

      if(!currentQuestion) {
        state.isGameOver = true;
        return
      }

      const isCorrect = currentQuestion.answers[selectedAnswerIndex]?.isCorrect;

      if (isCorrect) {
        state.totalReward = currentQuestion.reward;
        state.currentQuestionIndex += 1;
      } else {
        state.isGameOver = true;
      }

    },
    reset: (state) => {
      state.currentQuestionIndex = 0;
      state.isGameOver = false;
      state.totalReward = 0;
    }
    
  },
});

export const { answerQuestion, setQuestions, reset } = gameSlice.actions;
export default gameSlice.reducer;
