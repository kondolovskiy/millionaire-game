import React, { useState, useEffect, useRef } from 'react';
import styles from './Answer.module.scss'

export enum VARIANTS {
  Normal = "normal",
  Selected = "selected",
  Correct = "correct",
  Wrong = "wrong",
}

type Props = {
  text: String,
  onClick: () => Boolean,
  onAnswer: () => void,
  testId?: String,
}

export const Answer: React.FC<Props> = ({ text, onClick, onAnswer, testId }) => {
  const [ variant, setVariant ] = useState(VARIANTS.Normal);

  const correctTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const answerTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => { 
      clearTimeout(correctTimerRef.current)
      clearTimeout(answerTimerRef.current)
    };
  }, [])

  const handleClick = () => {
    const isCorrect = onClick();

    setVariant(VARIANTS.Selected);

    correctTimerRef.current = setTimeout(() => {
      const nextVariant = isCorrect ? VARIANTS.Correct : VARIANTS.Wrong;
      setVariant(nextVariant);
    }, 1000);

    answerTimerRef.current = setTimeout(() => {
      onAnswer();
    }, 1500);
  }

  return (
    <div className={styles.wrapper} onClick={handleClick} role='button' data-testid={testId}>
      <div className={styles.background} >
        <svg width="405" height="72" viewBox="0 0 405 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles[variant]}>
          <path d="M388 36L405 36" />
          <path d="M0 36L17 36" />
          <path d="M38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344Z" />
        </svg>

      </div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}