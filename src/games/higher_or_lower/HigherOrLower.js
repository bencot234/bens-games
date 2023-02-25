import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ScoreModal from './ScoreModal'
import BackToGamesBtn from '../../BackToGamesBtn'

const getLocalStorage = () => {
	let topScore = JSON.parse(localStorage.getItem('topScore'))
	if (topScore) {
		return topScore;
	}
	return 0;
}

function HigherOrLower() {
	const [initialCard, setInitialCard] = useState(null);
	const [nextCard, setNextCard] = useState({});
	const [showNextCard, setShowNextCard] = useState(false);
	const [message, setMessage] = useState('');
	const [points, setPoints] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [deckId, setDeckId] = useState('');
	const [showButton, setShowButton] = useState(true);
	const [showButtons, setShowButtons] = useState(false);
	const [anotherGame, setAnotherGame] = useState(false);
	const [topScore, setTopScore] = useState(getLocalStorage());


	const fetchDeck = async () => {
		try {
			const response = await axios('https://www.deckofcardsapi.com/api/deck/new/shuffle/')
			const newDeck = await response.data;
			const newDeckId = newDeck.deck_id;
			setDeckId(newDeckId);
		} catch (err) {
			console.log(err)
		}
	}

	const drawInitialCards = async () => {
		try {
			const response = await axios(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
			const cards = await response.data.cards;
			setInitialCard(cards[0])
			setNextCard(cards[1])
		} catch (error) {
			console.log(error)
		}
	}

	const drawNextCard = async () => {
		try {
			const response = await axios(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
			const card = await response.data.cards[0];
			setNextCard(card)
		} catch (error) {
			console.log(error)
		}
	}
 
	const beginGame = () => {
		drawInitialCards()
		setDisabled(false)
		setPoints(0)
		setShowButton(false)
		setShowModal(false)
		setShowNextCard(false)
		setShowButtons(true)
	}

	useEffect(() => {
		fetchDeck()
	}, [])

	const rightGuess = () => {
		setPoints((oldPoints) => {
			return oldPoints + 1;
		})
		setDisabled(true)
		setTimeout(() => {
			setInitialCard(nextCard)
			setShowNextCard(false)
			drawNextCard();
			setDisabled(false)
		}, 1500)
	}

	const numerizeValue = (value) => {
			if (value === 'KING') value = 13;
			if (value === 'QUEEN') value = 12;
			if (value === 'JACK') value = 11;
			if (value === '10') value = 10;

		return value;
	}

	const sameGuess = () => {
		setMessage('The values are the same!')
		setDisabled(true)
		setTimeout(() => {
			setInitialCard(nextCard)
			setShowNextCard(false)
			setMessage('')
			drawNextCard();
			setDisabled(false)
		}, 1500)
	}

	const wrongGuess = () => {
		setDisabled(true)
		setTimeout(() => {
			setShowModal(true)
			setShowButton(true)
			setAnotherGame(true)
			if (points > topScore) {
				setTopScore(points)
				localStorage.setItem('topScore', JSON.stringify(points))
			}
		}, 1500)
	}

	const compareValues = (guess) => {
		setShowNextCard(true)
		let initialCardValue = numerizeValue(initialCard.value)
		let nextCardValue = numerizeValue(nextCard.value)
		if (initialCardValue === nextCardValue) {
			sameGuess()
		} else if (nextCard.value === 'ACE') {
			if (guess === 'higher') nextCardValue = 14;
			if (guess === 'lower') nextCardValue = 1;
		} else if (initialCard.value === 'ACE') {
			if (guess === 'higher') initialCardValue = 1;
			if (guess === 'lower') initialCardValue = 14;
		}
		if (initialCardValue < nextCardValue) {
			guess === 'higher' ? rightGuess() : wrongGuess()
		}
		if (initialCardValue > nextCardValue) {
			guess === 'lower' ? rightGuess() : wrongGuess()
		}
	}

	return (
		<>
			<Wrapper>
				<main>
					<p className='title'>higher...? or lower?</p>
					{showModal && <ScoreModal points={points} topScore={topScore}/>}
					<p>{message}</p>
					<p className='top-score'>top score: {topScore}</p>
					<p className='points'>points: {points}</p>
					<button className={`${showButton ? 'visible' : 'invisible'} btn begin-btn`} onClick={beginGame}>{anotherGame ? 'play again' : 'begin'}</button>
					<div className="cards-container">
						{initialCard &&
							<div>
								<img src={initialCard.image} alt="initial card" />
							</div>
						}
						{nextCard && 
							<div className={`${showNextCard ? 'show' : 'hide'}`}>
								<img src={nextCard.image} alt="next card" />
							</div>
						}
					</div>
					<div className={showButtons ? 'show' : 'hide'}>
						<button 
							className="btn" 
							disabled={disabled} 
							onClick={() => compareValues('higher')}
						>
							higher
						</button>
						<button 
							className="btn" 
							disabled={disabled} 
							onClick={() => compareValues('lower')}
						>
							lower
						</button>
					</div>
				</main>
			</Wrapper>
			<BackToGamesBtn/>
		</>
	);
}
const Wrapper = styled.section`
	.title {
  	font-size: 1.5rem;
		font-weight: normal;
		text-transform: capitalize;
	}
	.btn {
		padding: 1rem;
		background-color: #21b5ae;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 0.7rem;
		border-radius: 1rem;
		border: none;
		transition: 0.5s;
		cursor: pointer;
		margin: 0.3rem;
	}
	.btn:hover {
		background-color: #de4151;
		transition: 0.5s;
	}
	.show {
		display: inline-block;
	}
	.hide {
		display: none;
	}
	.invisible {
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
	.cards-container {
		margin: 1rem;
	}
	main {
		text-align: center;
		position: relative;
		max-width: 750px;
		margin: 0 auto;
	}
	.top-score, .points {
		position: absolute;
		font-size: small;
		text-transform: uppercase;
		background-color: #21b564;
		width: 7rem;
		color: white;
		font-weight: bold;
		padding: 0.5rem;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		top: 25px;
	}
	.points {
		background-color: #2172b5;
		top: 65px;
	}
	.begin-btn {
		background-color: #de4151;
		transition: 0.5s;
	}
	.begin-btn:hover {
		background-color: #21b5ae;
		transition: 0.5s;
	}
	@media (min-width: 600px) {
		.cards-container {
			display: flex;
			justify-content: center;
		}
		.top-score,
		.points {
			border-radius: 0px;
		}
		.points {
			top: 40px;
		}
		.top-score {
			top: 0
		}
	}`

export default HigherOrLower;
