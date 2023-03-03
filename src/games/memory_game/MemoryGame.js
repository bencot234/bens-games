import './mg.css';
import Cards from './Cards';
import { useState, useRef, useEffect } from 'react';
import { useGameContext } from './context';
import styled from 'styled-components';
import BackToGamesBtn from '../../BackToGamesBtn';

const getTopScore = () => {
	let topScore;

	const hardScore = localStorage.getItem('hard_score');
	if (hardScore) topScore = hardScore;
	if (!hardScore) {
		const mediumScore = localStorage.getItem('medium_score');
		if (mediumScore) topScore = mediumScore;
		if (!mediumScore) {
			const easyScore = localStorage.getItem('easy_score');
			if (easyScore) {
				topScore = easyScore;
			} else topScore = 0;
		}
	}
	return topScore;
}

function App() {
	const { 
		shuffleCards, 
		displayButtons, 
		hideButtons,
		showCards,
		startTimer,
		isTimerRunning,
		formatTime,
		setMatchedCards,
		showButtons,
		hideCards,
		matchedCards,
		cards,
		stopTimer,
	} = useGameContext();

	const [secondsElapsed, setSecondsElapsed] = useState(0);
	const [winState, setWinState] = useState(false);
	const [topScore, setTopScore] = useState(getTopScore());
	const [difficulty, setDifficulty] = useState('');
	const intervalId = useRef(null);

	useEffect(() => {
		if (matchedCards.length === cards.length) {
			setWinState(true);
			clearInterval(intervalId.current);
			stopTimer()
			const storedTime = localStorage.getItem(difficulty+'_score');
			if (secondsElapsed < storedTime || !storedTime) {
				setTopScore(secondsElapsed);
				localStorage.setItem(difficulty+'_score', JSON.stringify(secondsElapsed))
			}
		}
	}, [matchedCards, cards.length])

	useEffect(() => {
		if (isTimerRunning) {
			intervalId.current = setInterval(() => {
				setSecondsElapsed((prevSeconds) => prevSeconds + 1);
			}, 1000)
		}
		return () => clearInterval(intervalId.current)
	}, [isTimerRunning]);


	const gameDifficulty = (difficulty) => {
		setDifficulty(difficulty)
		if (difficulty === 'easy') {
			shuffleCards(6);
		}
		if (difficulty === 'medium') {
			shuffleCards(10);
		}
		if (difficulty === 'hard') {
			shuffleCards(20);
		}
		
		hideButtons();
		showCards();
		startTimer();
		let topScore = 0;
		const storedTime = JSON.parse(localStorage.getItem(difficulty+'_score'));
		if (storedTime) {
			topScore = storedTime;
		}

		setTopScore(topScore)
	}

	const newGame = () => {
		setWinState(false);
		setMatchedCards([]);
		shuffleCards();
		showButtons();
		hideCards();
		setSecondsElapsed(0);
	}
	
	return (
		<>
			<Wrapper>
				<main>
					<div className='time-container'>
						<div className='best-time'>best: {formatTime(topScore)}</div>
						<div className='timer'>time: {formatTime(secondsElapsed)}</div>
					</div>
					<div className='title'>memory game</div>
					<div className={`${displayButtons ? 'btn-container': 'hide'}`}>
						<button className='btn' onClick={() => gameDifficulty('easy')}>easy</button>
						<button className='btn' onClick={() => gameDifficulty('medium')}>medium</button>
						<button className='btn' onClick={() => gameDifficulty('hard')}>hard</button>
					</div>
					<Cards intervalId={intervalId}/>
					<div className={`${winState ? 'show' : 'hide'}`}>
						<p className='win-message'>you won!</p>
						<button className='btn' onClick={newGame}>play again?</button>
					</div>
				</main>
			</Wrapper>
			<BackToGamesBtn/>
		</>
	);
}

const Wrapper = styled.section`
.show {
  display: flex;
  flex-direction: column;
}
.hide {
  display: none;
}
.title, .win-message {
  text-align: center;
  text-transform: uppercase;
  margin: 2rem;
  font-weight: bolder;
  letter-spacing: 1px;
}
main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  background-color: orange;
  border: none;
  text-transform: capitalize;
  padding: 1rem;
  cursor: pointer;
  transition: 0.5s;
  font-weight: bold;
}
.btn-container {
  display: flex;
  gap: 1rem;
  margin: 1rem;
}
.btn:hover {
  background-color: blueviolet;
  color: white;
  transition: 1s;
}
.best-time, .timer {
  text-transform: capitalize;
  background-color: transparent;
  padding: 0.5rem;
  color: white;
  font-weight: bold;
}
.best-time {
  color: black;
}
.time-container {
  display: flex;
  gap: 3rem;
  margin-top: 1rem;
  background-image: linear-gradient(to right, orange, blueviolet);
}
`

export default App;
