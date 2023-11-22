import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Game } from './Game';
import { setQuestions } from '../../stores/gameSlice';
import { RootState } from '../../stores';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Game component', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: (state = { currentQuestionIndex: 0, totalReward: 0, isGameOver: false, questions: [] }, action) => {
          // Your reducer logic here if needed
          return state;
        },
      },
    });

    // Mock API calls or data loading here if needed
  });

  test('renders Game component', () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    // Example: Check if the component renders a question
    expect(screen.getByTestId('question')).toBeInTheDocument();
  });

  test('handles answer selection and dispatches actions', () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    // Mock your questions and answers data
    const questions = [
      {
        question: 'Sample Question',
        answers: [
          { answer: 'Answer 1', isCorrect: true },
          { answer: 'Answer 2', isCorrect: false },
        ],
        reward: 10,
      },
    ];

    store.dispatch(setQuestions(questions));

    fireEvent.click(screen.getByTestId('answer-1'));

    expect((store.getState() as RootState).game.currentQuestionIndex).toBe(0); 
  });

  test('handles opening rewards list', () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>
    );

    const rewardsButton = screen.getByTestId("rewards-button");

    // Example: Simulate clicking on the rewards button
    fireEvent.click(rewardsButton);

    // Check if the rewards list becomes active
    expect(screen.getByTestId("rewards-list")).toHaveClass('active');
  });
});
