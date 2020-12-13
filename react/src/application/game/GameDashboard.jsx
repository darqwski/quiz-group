import React from 'react';
import Loading from '../../components/loading/Loading';
import './game.less';
import { GameContextManager, useGame } from './GameContext';
import StartCountdown from './StartCountdown';
import QuestionView from './QuestionView';
import FinalView from './FinalView';

/**
 *
 * GAME - FLOW
 *  1. Countdown 3,2,1
 *  2. FOR questions
 *     a) Request for questions and answers
 *     c) Give some time to answer question
 *     b) Send response
 *     c) Receive correct answer
 *  3. get sum of points
 *  4. allow to redirect
 *
 */

const GameDashboard = () => {
	const { view } = useGame();

	if(view === 'countdown') {
		return <StartCountdown />;
	}
	if(view === 'question'){
		return <QuestionView />;
	}
	if( view === 'final'){
		return <FinalView/>;
	}
	return <Loading/>;
};

GameDashboard.propTypes = {};

const GameDashboardWithContext = () => (
	<GameContextManager>
		<GameDashboard />
	</GameContextManager>
);

export default GameDashboardWithContext;