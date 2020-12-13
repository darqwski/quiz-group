import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	progress: {
		width: ({ value, maxValue }) => `${((value/maxValue)*100)}%`,
	}
});

const TimeLoader = ({ time, onFinish = () => {}, stop }) => {
	const [value, setValue] = useState(0);
	const maxValue = time*1000;
	const classes = useStyles({ value, maxValue  });
	useEffect(()=>{
		if(value >= maxValue){
			onFinish?.();
		} else {
			if(stop)return;
			setTimeout(()=>{
				setValue(i=>i+100);
			}, 50);
		}
	}, [value, stop]);
	useEffect(()=>{
		if(!stop){
			setValue(0);
		}
	}, [stop]);

	return (
		<div className="game-loader">
			<div className={`game-progress ${classes.progress}`} />
		</div>
	);
};

TimeLoader.propTypes = {
	time: PropTypes.number,
	onFinish:PropTypes.func,
	stop: PropTypes.bool
};

export default TimeLoader;