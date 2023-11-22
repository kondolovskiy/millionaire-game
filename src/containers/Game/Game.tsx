import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { answerQuestion, setQuestions, reset, Answer as AnswerType } from '../../stores/gameSlice';
import { RootState } from "../../stores";
import questions from '../../assets/json/questions.json';
import RewardsList from "../../componets/RewardsList";
import AnswersList from "../../componets/AnswersList";
import menu from '../../assets/images/menu.svg';
import close from '../../assets/images/close.svg';
import styles from './Game.module.scss'

const rewards = [...questions.questions.sort((a, b) => b.reward - a.reward)];
const sortedQuestions = [...questions.questions.sort((a, b) => a.reward - b.reward)];

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector((state: RootState) => state.game.currentQuestionIndex);
  const isGameOver = useSelector((state: RootState) => state.game.isGameOver);

  const [isRewardsShown, setRewardsShown] = useState<Boolean>(false);

  const navigate = useNavigate();

  if (isGameOver) {
    navigate("/end");
  }

  const currentQuestion = sortedQuestions[currentQuestionIndex];

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null
    }
  }, [])

  useEffect(() => {
    dispatch(reset());
    dispatch(setQuestions(sortedQuestions));
  }, [dispatch]);

  const handleAnswerSelect = (answer: AnswerType) => {
    return answer.isCorrect;
  }

  const handleAnswer = (answerIndex: number) => {
    dispatch(answerQuestion(answerIndex))
  }

  const icon = isRewardsShown ? close : menu;

  const handleOpenRewards = () => {
    setRewardsShown(prevStatus => !prevStatus);
  }

  return (
    <div className={styles.parent}>

      <div role="button" data-testid="rewards-button" className={styles.menu} onClick={handleOpenRewards}>
        <img src={icon} alt="Show rewards" />
      </div>
      <h2 className={styles.question} data-testid="question">{currentQuestion.question}</h2>
      <div className={styles.answers}>
        <AnswersList
          answers={currentQuestion.answers}
          onAnswerSelect={handleAnswerSelect}
          onAnswer={handleAnswer}
        />
      </div>
      <div className={classNames(styles.rewards, {[styles.active]: isRewardsShown})} data-testid="rewards-list">
        <RewardsList
          rewards={rewards}
          currentQuestionIndex={currentQuestionIndex} />
      </div>
    </div>
  )
}