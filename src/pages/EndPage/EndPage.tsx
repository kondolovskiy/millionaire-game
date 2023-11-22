import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from "../../stores";
import Button from '../../componets/Button';
import { USDollar } from '../../utils';
import styles from './EndPage.module.scss';
import hand from '../../assets/images/hand.png'

export const EndPage: React.FC = () => {

  const navigate = useNavigate();

  const totalReward = useSelector((state: RootState) => state.game.totalReward);

  const handleClick = () => {
    navigate('/game');
  }

  return (
    <div className={styles.wrapper}>
      <img src={hand} className={styles.image} alt="Hand" />
      <div className={styles.main}>
        <div className={styles.scoreWrapper}>
          <span className={styles.totalScoreHeader}>Total score:</span>
          <h1 className={styles.totalScore}>{USDollar.format(totalReward)} earned</h1>
        </div>
        <Button text="Try again" onClick={handleClick} />
      </div>
    </div>
  )
}
