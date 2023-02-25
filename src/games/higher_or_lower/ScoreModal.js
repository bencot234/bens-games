import React from 'react'
import styled from 'styled-components'

const ScoreModal = ({points, topScore}) => {
	return (
		<Wrapper>
			<div className="game-over">
				<p>game over!</p> your score is {points}
				<p>top score is {topScore}</p>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	.game-over {
		position: absolute;
		top: 34%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 2rem;
		font-size: x-large;
		text-transform: capitalize;
		height: 250px;
		border: 1px solid black;
		border-radius: 10px;
		width: 160px;
	}

	@media (min-width: 600px) {
		.game-over {
			top: 53%;
		}
	`

export default ScoreModal
