import React from 'react';
import Reward, { VARIANTS } from '../Reward';
import styles from './RewardsList.module.scss';

type Props = {
  rewards: Array<{
    question: string,
    reward: number
  }>,
  currentQuestionIndex: number,
};

export const RewardsList: React.FC<Props> = ({ rewards, currentQuestionIndex }) => {
  const getVariant = (index: number): VARIANTS => {
    const rewardsLength = rewards.length - 1;
    const elementPosition = rewardsLength - index;
    
    if (currentQuestionIndex === elementPosition) {
      return VARIANTS.Active
    } else if (currentQuestionIndex > elementPosition) {
      return VARIANTS.Passed
    } else if (currentQuestionIndex < elementPosition) {
      return VARIANTS.Future
    }

    return VARIANTS.Future
  }

  return (
    <div className={styles.list}>
      {rewards.map((question, index) => (
        <Reward
          key={question.question}
          text={question.reward}
          variant={getVariant(index)}
        />
      ))}
    </div>
  )
}
