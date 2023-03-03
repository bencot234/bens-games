import { useEffect } from 'react'
import { useGameContext } from './context';
import styled from 'styled-components';

const Cards = () => {
	const {
		cards,
		displayCards,
		flippedCards,
		matchedCards,
		setFlippedCards,
		setMatchedCards,
	} = useGameContext();

	const handleClick = (id, color) => {
		if (flippedCards.length === 2) {
			return;
		}
		setFlippedCards([...flippedCards, { id, color}])
	}

	useEffect(() => {
		if (flippedCards.length === 2) {
			const [card1, card2] = flippedCards;
			if (card1.color === card2.color) {
				setMatchedCards([...matchedCards, card1.id, card2.id])
				setFlippedCards([]);
			} else {
				setTimeout(() => {
					setFlippedCards([]);
				}, 1000)
			}
		}
	}, [flippedCards])



  return (
	<Wrapper>
		<div className={`${displayCards ? 'card-container' : 'hide'}`}>
			{cards.map(card => {
				const {id, color} = card;
				const isCardFlipped = flippedCards.some((flippedCard) => flippedCard.id === card.id);
				const isCardMatched = matchedCards.includes(card.id);

				return <div
					key={id}
					className={`card ${isCardFlipped || isCardMatched ? color : 'gray'}`}
					onClick={() => handleClick(id, color)}
				>
				</div>
			})}
		</div>
	</Wrapper>
  )
}

const Wrapper = styled.div`
.card {
  height: 50px;
  width: 60px;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 300px;
}

.blue {
  background-color: blue;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.yellow {
  background-color: yellow;
}
.orange {
  background-color: orange;
}
.aquamarine {
  background-color: aquamarine;
}
.bisque {
  background-color: bisque;
}
.blueviolet {
  background-color: blueviolet;
}
.cadetblue {
  background-color: cadetblue;
}
.chocolate {
  background-color: chocolate;
}
.gray {
  background-color: gray;
}

.show {
  display: flex;
  flex-direction: column;
}
.hide {
  display: none;
}
@media (min-width: 800px) {
  .card {
      height: 100px;
      width: 120px;
  }
  .card-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 50px;
    width: 800px;
  }
}
`

export default Cards
