import {useState} from 'react';
import ChoosePlayerName from './ChoosePlayerName';
import { useGlobalContext } from './context';
import styled from 'styled-components';

const SelectPlayers = () => {
	const {setInitialPlayers, setExtraRules} = useGlobalContext();
	const [showForm, setShowForm] = useState(false);
	const [showForms, setShowForms] = useState(true);
	
	const [playerID, setPlayerID] = useState(1);

	const handleNumPlayers = (numPlayers) => {
		if (numPlayers >= 5) setExtraRules(true);
		setShowForm(true);
		let totalPlayers = [];
		for (let i = 1; i <= numPlayers; i++) {
			totalPlayers.push({
				id: i,
				name: 'player '+i,
				points: 0,
				health: 3,
				inTokyo: false,
				inTokyoCity: false,
				inTokyoBay: false,
				isTurn: true,
			});
		}
		setInitialPlayers(totalPlayers);
	}

	return <Wrapper>
		<div className={`${showForms ? 'select-players-container' : 'hide'}`}>
			<div className={`${showForm ? 'hide' : 'select-num-players'}`}>
				<h1>Select number of players</h1>
				<button className="btn general-btn" onClick={() => handleNumPlayers(2)}>2</button>
				<button className="btn general-btn" onClick={() => handleNumPlayers(3)}>3</button>
				<button className="btn general-btn" onClick={() => handleNumPlayers(4)}>4</button>
				<button className="btn general-btn" onClick={() => handleNumPlayers(5)}>5</button>
				<button className="btn general-btn" onClick={() => handleNumPlayers(6)}>6</button>
			</div>
			<div className={`${showForm ? '' : 'hide'}`}>
			<ChoosePlayerName playerID={playerID} setPlayerID={setPlayerID} setShowForms={setShowForms}/>
			</div>
		</div>
	</Wrapper>
}

const Wrapper = styled.div`
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
.general-btn:hover {
	background-color: rgb(115, 211, 251);
	transition-duration: 0.5s;
}
.select-players-container {
	position: absolute;
	z-index: 1;
	top: 20rem;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	border-radius: 1rem;
}
.hide {
	display: none;
}
.select-num-players {
	text-align: center;
	background-color: #fcfcf0;
	border: solid 2px rgb(153, 222, 51);
	color: black;
	padding: 1rem 2rem;
	border-radius: 1rem;
	width: 80vw;
}
@media (min-width: 700px) {
	.select-num-players {
		width: 500px;
	}
}
`

export default SelectPlayers;