import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../componets/Button';
import styles from './StartPage.module.scss';
import hand from '../../assets/images/hand.png'
import { findAngle } from './StartPage.utils';

export const StartPage: React.FC = () => {
  
  const [angle, setAngle] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => {
      const x = window.innerWidth;
      const y = window.innerHeight;
      const angleDegrees = findAngle(x, y);
      setAngle(angleDegrees)
    }

    onResize();

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleClick = () => {
    navigate('/game');
  }

  const gradient = `linear-gradient(${angle}deg, var(--color-white) 50%, var(--color-quaternary) 50%)`

  return (
    <div className={styles.wrapper} style={{ background: gradient }}>
      <img src={hand} className={styles.image}  alt="Hand" />
      <div className={styles.main}>
        <h1>Who wants to be a millionaire?</h1>
        <Button text="Strat" onClick={handleClick} />
      </div>
    </div>
  )
}
