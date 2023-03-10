import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import styled from 'styled-components';
import 'animate.css';

const Player = ({name, points, health, inTokyo, isTurn, monster, inTokyoCity, inTokyoBay}) => {
	return (
		<Wrapper className='wrapper'>
			<div className={`${isTurn ? 'animate__animated animate__pulse' : ''} ${inTokyo || inTokyoCity ? 'player-in-tokyo' : inTokyoBay ? 'in-tokyo-bay' : ''} image-container`}>
				<img className={`${monster.name}-image image ${isTurn ? 'selected-image' : ''}`} src={monster.image} alt={monster.name} />
				<div className={`player-container ${isTurn ? 'player-is-turn' : ''}`}>
					<h2>{name}</h2>
					<div className='player-content'>
						<p className="points">
							<FaStar className={`${isTurn ? 'star' : ''} icon`}/> 
							<span className='points-number'>{points}</span>
						</p>
						<p className="health">
							<AiFillHeart className={`${isTurn ? 'heart' : ''} icon`}/> 
							<span className='health-number'>{health}</span>
						</p>
					</div>
				</div>
				<div className={`${inTokyo || inTokyoCity ? 'in-tokyo in-city' : 'hide'} ${isTurn ? 'in-tokyo-text' : ''}`}>tokyo city</div>
				<div className={`${inTokyoBay ? 'in-tokyo in-bay' : 'hide'} ${isTurn ? 'in-tokyo-text' : ''}`}>tokyo bay</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
.wrapper {
	position: relative;
}
.hide {
	display: none;
}
.in-tokyo {
	position: absolute;
	background-color: white;
	top: -4px;
	left: 21px;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 7px;
	padding: 5px;
	padding-bottom: 3px;
	border-radius: 50%;
	color: #bbb;
}
.in-city {
	background-color: red;
	border: 3px solid red;
}
.in-bay {
	background-color: blue;
	border: 3px solid blue;
}
.in-tokyo-text {
	color: white;
}
.player-container {
	margin: 10px;
	border-radius: 10px;
	margin: 1rem;
	width: 8.5rem;
	color: #bbb;
	position: absolute;
	top: 0;
	opacity: 70%;
}
.player-container h2 {
	font-size: small;
	background-color: white;
	padding: 2px;
	border-radius: 5px;
}
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
.player-content {
	line-height: 0px;
	margin: 0;
	padding-left: 1.3rem;
}

.points, .health {
	margin-top: 5px;
	margin-bottom: 0px;
	font-size: small;
	background-color: white;
	padding: 5px;
	padding-top: 0px;
	border-radius: 5px;
}

.player-content p span{
	line-height: 0.5rem;
	font-weight: bold;
	padding-bottom: 4px;
}
.star {
	color: #ffcc00;
}
.heart {
	color: red;
}
.icon {
	position: relative;
	top: 0.1rem;
}
.image-container {
	width: 100px;
	height: 100px;
	position: relative;
	overflow: hidden;
	border-radius: 50%;
	border: 2px solid rgb(153, 222, 51);
	background-color: #000;
}
.player-in-tokyo {
	border: solid 2px red;
}
.player-in-tokyo h2 {
	color: red;
}
.in-tokyo-bay {
	border: solid 2px rgb(88, 47, 254);
}
.in-tokyo-bay h2 {
	color: rgb(88, 47, 254);
}
.image {
	width: 320px;
	height: auto;
	position: absolute;
	top: -10px;
	left: -220px;
	object-fit: cover;
	opacity: 60%;
}
.player-is-turn {
	opacity: 1;
	color:rgb(153, 222, 51);
}
.selected-image {
	opacity: 100%;
}
.king-image {
	left: -120px;
}
.meka-image {
	left: -190px;
	top: -30px;
}
.gigazaur-image {
	top: -15px;
	left: -170px;
}
.bunny-image {
	top: -50px;
	left: -170px;
}
.kraken-image {
	top: -30px;
	left: -160px;
}
.alienoid-image {
	left: -100px;
}
.alienoid-image {
	left: -450px;
	top: -55px;
	width: 650px;
}
@media (min-width: 1150px) {
	.in-tokyo {
		top: -5px;
		left: 48px;
		font-size: small;
		padding: 10px;
		padding-bottom: 5px;
	}
	.image {
		width: 500px;
		top: -10px;
		left: -220px;
	}
	.image-container {
		width: 200px;
		height: 200px;
	}
	.players-container {
		row-gap: 1rem;
		column-gap: 35rem;
	}
	.player-content {
		font-size: larger;
		padding-left: 5.5rem;
	}
	.player-container h2 {
		font-size: x-large;
	}
	.icon {
		position: relative;
		top: 0.17rem;
	}
	.points,
	.health {
		margin-top: 15px;
		margin-bottom: 0px;
		font-size: larger;
	}
	.player-container {
		width: 20rem;
	}
	.king-image {
		left: -175px;
	}
	.meka-image {
		left: -255px;
		top: -30px;
	}
	.gigazaur-image {
		top: -15px;
	}
	.bunny-image {
		top: -50px;
	}
	.alienoid-image {
		left: -485px;
		top: -50px;
		width: 780px;
	}
}
`

export default Player;