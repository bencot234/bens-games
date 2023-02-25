import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import games from './data';

function Home() {
	const setBackground = (color) => {
		document.body.style.background = color;
	}

	useEffect(() => {
		setBackground('black')
	}, [])

	const showName = (name) => {
		const e = document.getElementById('name');
		e.style.color = 'white';
		e.innerText = name;
	}
	const hideName = (name) => {
		document.getElementById('name').innerText = '';
	}

	return (
		<Wrapper className='wrapper'>
			<div className='games-container'>
				{games.map(game => {
					const {id, name, link, image, background, delay} = game;
					return <div className='link-container' key={id} onMouseOver={() => showName(name)} onMouseOut={() => hideName(name)}>
						<Link 
							to={link} 
							onClick={() => setBackground(background)} 
							className={`link animate__animated animate__fadeIn animate__delay-${delay}`}
						>
							<div className='image-container'>
									<img src={image} alt={name} className='image'/>
							</div>
							<p className='name-sml-screen'>{name}</p>
					</Link>
				</div>
				})}
			</div>
			<div className='animation-container'>
				<div className='title-center'>
					<div id='name' className='name'></div>
					<div className='choose-your-game'>choose</div>
					<div className='choose-your-game your'>your</div>
					<div className='choose-your-game game'>game</div>

				</div>
				{/* <div className='game-name-hover'>{game}</div> */}
			</div>
		</Wrapper>

	);
}

const Wrapper = styled.div`
// WRAPPER 
.wrapper {
	postition: relative;
}

// OPENING ANIMATION
.choose-your-game {
		color: white;
		font-size: 100px;
		font-weight: bold;
		text-transform: capitalize;
		animation-name: choose;
		animation-duration: 1s;
		visibility: hidden;
}
.your {
		animation-delay: 1s;
		position: absolute;
}
.game {
		animation-delay: 2s;
		position: absolute;
}
@keyframes choose {
	0% {visibility: hidden;}
	50% {visibility: visible;}
	100% {visibility: hidden;}
}
.animation-container {
	position: absolute;
	top: 0;
}
.title-center {
	display: flex;
	justify-content: center;
	margin: 0 auto;
	width: 100vw;
}

@media (min-width: 900px) {
	.choose-your-game {
			font-size: 200px;
	}
	.animation-container {
			position: relative;
			display: flex;
	}
}

// LINK
.image-container {
	width: 100vw;
	height: 150px;
	background-color: white;
}
.image {
	max-height: 86%;
	width: auto;
}
.link {
	text-decoration: none;
}
.link-container {
	text-align: center;
	text-transform: capitalize;
	font-size: small;
	font-weight: bold;
	color: black;
	transition: 0.5s;
	overflow: hidden;
}
@media (min-width: 900px) {
	.image-container {
		width: 200px;
		height: 200px;
	}
	.link-container:hover {
		transform: translate(0, -10px);
	}
}

// GAME NAME
.name-sml-screen {
	color: white;
	margin-bottom: 2rem;
	font-size: 20px;
}
.name {
	font-size: 50px;
	display: flex;
	text-align: center;
	font-weight: bold;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 0 auto;
	position: absolute;
	top: 0;
	margin-top: 30px;
}
@media (min-width: 900px) {
	.name {
		font-size: 200px;
	}
	.name-sml-screen {
		display: none;
	}
}


// OVERALL CONTAINER
.games-container {
	display: flex;
	flex-direction: column;
	place-items: center;
	margin-top: 10vh;
}
@media (min-width: 900px) {
	.games-container {
			display: flex;
			gap: 20px;
			flex-direction: row;
			justify-content: center;
			margin-top: 20vh;
	}
}
`

export default Home;