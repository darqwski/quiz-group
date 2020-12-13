import React, { useEffect, useState } from 'react';
import { useGame } from './GameContext';

const StartCountdown = () => {
	const { setView } = useGame();
	const [count, setCount] = useState(3);
	const [className, setClassName] = useState(3);
	useEffect(()=>{
		setTimeout(()=>{
			setClassName('countdown-show');
		}, 100);
	}, [className]);
	useEffect(()=>{
		if(count !== 0)setTimeout(()=>{
			setClassName('');
			setTimeout(()=>{
				setCount(i=>i-1);
			},100);
		},900);
		if(count === 0)setTimeout(()=>{
			setView('question');
		},1000);
	},[count]);

	return (
		<div className="countdown">
			<div className={`countdown-text ${className}`}>{count || 'START!!'}</div>
		</div>
	);
};

StartCountdown.propTypes = {};

export default StartCountdown;