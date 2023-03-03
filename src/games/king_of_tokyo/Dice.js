import Die from './Die';
import { useGlobalContext } from './context';
import styled from 'styled-components';

const Dice = () => {
	const {dice} = useGlobalContext();

	return (
		<Wrapper>
			<div className='dice-container'>
				{dice.map(die => {
					return <Die 
						key={die.id}
						{...die}
					/>
				})}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
.dice-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 16rem;
	margin: 0 auto;
}
@media (min-width: 1150px) {
	.dice-container {
		display: flex;
		width: 35rem;
	}
`

export default Dice;