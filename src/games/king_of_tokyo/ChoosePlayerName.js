import {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { useGlobalContext } from './context';
import kraken from './images/Kraken.jpeg';
import king from './images/the_king.jpeg';
import gigazaur from './images/Gigazaur.jpeg';
import meka from './images/MekaDragon.jpeg';
import bunny from './images/CyberBunny.jpeg';
import alienoid from './images/Alienoid.jpeg';

const ChoosePlayerName = ({playerID, setPlayerID, setShowForms}) => {
	const nameInput = useRef();
	const {setInitialPlayers, players, setShowGame} = useGlobalContext();
	const [name, setName] = useState('');
	const [monsters, setMonsters] = useState([
		{
			id: 1,
			name: 'kraken',
			image: kraken,
			selected: true,
		},
		{
			id: 2,
			name: 'king',
			image: king,
			selected: false,
		},
		{
			id: 3,
			name: 'gigazaur',
			image: gigazaur,
			selected: false,
		},
		{
			id: 4,
			name: 'meka',
			image: meka,
			selected: false,
		},
		{
			id: 5,
			name: 'bunny',
			image: bunny,
			selected: false,
		},
		{
			id: 6,
			name: 'alienoid',
			image: alienoid,
			selected: false,
		},
	]);
	
	if (nameInput.current) {
		nameInput.current.focus();
	}

	const handleSubmit = (e) => {
        e.preventDefault();
        setInitialPlayers(players.map(player => {
			const monster = monsters.find(monster => monster.selected);
			let placeHolderName = name;
			if (!name) {
				placeHolderName = `Player ${playerID}`;
			}
            if (player.id === playerID) {
                return {...player, name: placeHolderName, monster: monster}
            }
            return player;
        }))
        if (playerID < players.length) {
            setPlayerID(playerID + 1);
        } else if (playerID === players.length) {
			setPlayerID(1);
			setShowForms(false);
			setShowGame()
		}
		setName('');
		const newMonsters = monsters.filter(monster => !monster.selected);

		setMonsters(newMonsters.map((monster, i) => {
			if (i === 0) {
				return {...monster, selected: true}
			}
			return monster;
		}))
    }

	const handleSelectedMonster = (e) => {
		e.preventDefault();
		setMonsters(monsters.map(monster => {
			if (e.target.className.includes(monster.name)) {
				return {...monster, selected: true};
			}
			return {...monster, selected: false}
		}))
	}

	return (
		<Wrapper>
			<div className='choose-player-name-container'>
				<h1>Player {playerID}</h1>
				{monsters.map(monster => {
					const { id, name, image, selected } = monster;
					return <button 
						key={id}
						className={selected ? 'selected-thumb thumb-container' : 'thumb-container'}
						onClick={handleSelectedMonster}
					>
					<img className={`${name}-thumb thumb`} src={image} alt="" />
				</button>
				})}
				<form onSubmit={handleSubmit}>
					<div>
						<input 
							type="text"
							ref={nameInput}
							name={name}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={`Player ${playerID}`}
						/>
					</div>
					<button type="submit" className="btn submit-btn">Enter</button>
				</form>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
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
input {
	border: 1px solid black;
	height: 2.4rem;
	margin-top: 1rem;
	width: 8rem;
	background-color: white;
	border-radius: 3px;
	margin-right: 1rem;
	font-size: 1rem;
	padding-left: 0.5rem;
}
.choose-player-name-container {
	text-align: center;
	background-color: #fcfcf0;
	border: solid 2px rgb(153, 222, 51);
	color: black;
	padding: 1rem 2rem;
	border-radius: 1rem;
	width: 80vw;
}
.thumb-container {
	width: 50px;
	height: 50px;
	position: relative;
	overflow: hidden;
	border-radius: 50%;
	border: 2px solid rgb(153, 222, 51);
	opacity: 50%;
}
.selected-thumb {
	opacity: 1;
}
.thumb {
	width: 140px;
	height: auto;
	position: absolute;
	top: -10px;
	left: -70px;
	object-fit: cover;
	border-radius: 50%;
}
.king-thumb {
	left: -55px;
}
.meka-thumb {
	left: -80px;
	top: -15px;
}
.bunny-thumb {
	top: -15px;
}
.alienoid-thumb {
	left: -80px;
}
@media (min-width: 700px) {
	.choose-player-name-container {
		width: 500px;
	}
}
`

export default ChoosePlayerName;