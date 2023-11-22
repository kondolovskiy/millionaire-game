import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: String,
  onClick?: () => void
}

export const Button: React.FC<Props> = ({ text, onClick }) => {
  return <button onClick={onClick} className={styles.button}>{text}</button>
}