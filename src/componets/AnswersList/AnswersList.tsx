import React from 'react'
import Answer from '../Answer'
import { Answer as AnswerType } from '../../stores/gameSlice';
import styles from './AnswerList.module.scss'

type Props = {
  answers: AnswerType[], 
  onAnswerSelect: (answer: AnswerType) => Boolean, 
  onAnswer: (index: number) => void
}

export const AnswersList: React.FC<Props> = ({ answers, onAnswerSelect, onAnswer }) => {
  return (
    <div className={styles.list}>
      {answers.map((answer, index) => (
          <Answer
            key={answer.answer.toString()}
            text={answer.answer}
            onClick={() => onAnswerSelect(answer)}
            onAnswer={() => onAnswer(index)}
            testId={`answer-${index}`}
          />
        ))}
    </div>
  )
}
