import { AiFillHeart } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { useGlobalContext } from './context';
import styled from 'styled-components';

const Die = ({id, value, selected}) => {
	const { selectDie, numRolls } = useGlobalContext();

	const displayValue = (value) => {
		if (value === 4) value = <AiFillHeart/>
		if (value === 5) value = <FaPaw/>
		return value;
	}

	return <Wrapper>
		<button
			disabled={numRolls === 3}
			className={`dice  ${selected ? 'die-selected' : ''}`}
			onClick={() => selectDie(id)}
		>
			<p className='dice-number'>{displayValue(value)}</p>
		</button>
	</Wrapper>
}

const Wrapper = styled.div`
.dice {
	background-color: rgb(174, 251, 58);
	width: 4rem;
	height: 4rem;
	text-align: center;
	border-radius: 0.25rem;
	margin: 0.5rem;
	border: solid 2px transparent;
	cursor: pointer;
	transition: 0.5s;
}
.dice:hover {
	background-color: rgb(153, 222, 51);
	transition: 0.5s;
}
.dice-number {
	font-weight: bold;
	margin: auto;
	padding-top: 0.6rem;
	font-size: 2rem;
	height: 100%;
	width: 100%;
}
.die-selected {
	border: solid 2px gray;
	background-color: rgb(153, 222, 51);
}
`

export default Die;