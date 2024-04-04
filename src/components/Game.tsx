import { useEffect, useRef, useState } from 'react';
import styles from './Game.module.scss';
import { useTimer } from '../hooks/useTimer';

const Game = () => {
    const [active, setActive] = useState<boolean>(false);
    const [ball, setBall] = useState<boolean>(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0
    })
    const firstBlockRef = useRef<HTMLDivElement | null>(null);
    const { time, start } = useTimer(5);

    const startGame = () => {
        setActive(true);
        setBall(true);
        start();

        const { top , width } = firstBlockRef.current!.getBoundingClientRect();
        const playerPosition = width / 2;
        setPosition({
            top: top,
            left: playerPosition
        });
    };

    useEffect(() => {
        if (time === 0) setActive(false);
    }, [time]);

	return (
		<div className={styles.wrapper}>
            <div className={styles.game}>
                <div className={`${styles.player} ${styles.move}`} ref={firstBlockRef}>1</div>
                <div className={styles.player}>2</div>
                {ball && 
                    <div 
                        className={styles.ball} 
                        style={{top: `${position.top}px`, left: `${position.left}px`}} 
                        onAnimationEnd={() => setBall(false)}
                    />}
            </div>
			<button
				className={styles.startBtn}
				onClick={startGame}
                disabled={active}
			>
				{active ? time : 'START'}
			</button>
		</div>
	);
};

export default Game;