import styled from 'styled-components';
import './kot.css';
import Dice from './Dice';
import Player from './Player';
import SelectPlayers from './SelectPlayers';
import { useGlobalContext } from './context';
import board from './images/king-of-tokyo-board.jpeg';
import Modal from './Modal';
import YieldModal from './YieldModal';
import BackToGamesBtn from '../../BackToGamesBtn';

function Game() {
	const { 
		rollDice, 
		numRolls, 
		players, 
		setNextPlayer, 
		currentPlayerIndex, 
		resetNumRolls, 
		setDiceResults,
		updatePlayers,
		checkEliminated,
		showModal,
		showYieldModal,
		setPlayerName,
		showGame,
	} = useGlobalContext();


	const handleSubmit = () => {
		setDiceResults();
		updatePlayers();
		checkEliminated();
		setNextPlayer();
		resetNumRolls();
		setPlayerName();
	}

	return (
		<>
			<main>
				<SelectPlayers/>
				{showGame && <div>
					<Dice/>
					{showModal && <Modal/>}
					{showYieldModal && <YieldModal/>}
					<Wrapper>
						<div className='btn-container'>
							<button onClick={rollDice} className='btn general-btn' disabled={numRolls === 0}>Roll Dice</button>
							<button className='btn submit-btn' disabled={numRolls === 3} onClick={handleSubmit}>Submit</button>
						</div>
						<div className="relative board-players-container">
							<div className='players-container'>
								{players.map((player, i) => {
									player.isTurn = i === currentPlayerIndex;
									return <Player key={player.id} {...player}/>
								})}
							</div>
							<div className="board">
								<img className="board-image" src={board} alt="king of tokyo board" />
							</div>
						</div>
					</Wrapper>
				</div>}
			</main>
			<BackToGamesBtn/>
		</>
	);
}

const Wrapper = styled.section`
.board-players-container {
	margin: 0 auto;
	width: 20rem;
	margin-top: 2rem;
}
.players-container {
	display: grid;
	grid-template-columns: 1fr auto;
	row-gap: 1rem;
	margin: 0 auto;
}
.board {
	left: 50%;
	position: absolute;
	top: 20rem;
	margin-left: -100px;
	width: 200px;
	z-index: -1;
}
.btn {
	border: 1px solid black;
	height: 2.6rem;
	margin-top: 1rem;
	width: 8rem;
	background-color: white;
	border-radius: 3px;
	font-weight: bold;
	cursor: pointer;
	transition-duration: 0.5s;
	margin-right: 1rem;
	font-size: 1rem;
	text-align: center;
}
.submit-btn {
	border: 1px solid transparent;
	background-color: #b4f53b;
}
.submit-btn:hover {
	background-color:#76b501;
	color: white;
}
.general-btn:hover {
	background-color: rgb(115, 211, 251);
	transition-duration: 0.5s;
}
.btn-container {
	margin: 0 auto;
	width: 8rem;
}
.board-image {
	max-width: 100%;
	max-height: auto;
	z-index: 0;
}
@media (min-width: 1150px) {
	.btn-container {
		width: 100%;
		margin: 0 auto;
		justify-content: center;
		display: flex;
	}
	.board {
		width: 500px;
		left: 52%;
		margin-left: -275px;
		top: 14rem;
	}
	.players-container {
		row-gap: 1rem;
		column-gap: 35rem;
	}
	.board-players-container {
		margin: 0 auto;
		width: 66rem;
	}
}
`


export default Game;