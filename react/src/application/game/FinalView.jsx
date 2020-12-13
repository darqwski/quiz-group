import React from 'react';
import { Button } from 'react-materialize';
import { useGame } from './GameContext';

const FinalView = () => {
	const { points } = useGame();

	return (
		<div className="final">
			<div className="final-top" />
			<div className="final-text">
                Twoj wynik to:
			</div>
			<div className="final-middle blue darken-4">
				{points} ptk
			</div>
			<div className="final-bottom">
				<Button flat onClick={()=>location.href ='../dashboard'}> Powrot </Button>
			</div>
		</div>
	);
};
FinalView.propTypes = {};

export default FinalView;