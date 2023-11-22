import { configureStore } from '@reduxjs/toolkit';
import gameReducer, { setQuestions, answerQuestion, reset, GameState } from './gameSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

test('setQuestions action', () => {
  const questions = [
    { question: 'Question 1', answers: [{ answer: 'Answer 1', isCorrect: true }], reward: 10 },
    { question: 'Question 2', answers: [{ answer: 'Answer 2', isCorrect: false }], reward: 5 },
  ];

  store.dispatch(setQuestions(questions));

  const state = store.getState().game as GameState;

  expect(state.questions).toEqual(questions);
});

// Test answerQuestion action
test('answerQuestion action - correct answer', () => {
  store.dispatch(answerQuestion(0));

  const state = store.getState().game as GameState;

  expect(state.totalReward).toBeGreaterThan(0);
  expect(state.currentQuestionIndex).toBe(1);
  expect(state.isGameOver).toBe(false);
});

test('answerQuestion action - incorrect answer', () => {
  store.dispatch(answerQuestion(1));

  const state = store.getState().game as GameState;
  
  expect(state.currentQuestionIndex).toBe(1);
  expect(state.isGameOver).toBe(true);
});

test('reset action', () => {
  store.dispatch(reset());

  const state = store.getState().game as GameState;

  expect(state.currentQuestionIndex).toBe(0);
  expect(state.totalReward).toBe(0);
  expect(state.isGameOver).toBe(false);
});
