import { useGlobalContext } from "./context";
import styled from 'styled-components';


const YieldTokyoBayModal = () => {
	const { 
		handleYieldTokyoBay,
		tokyoBayPlayer,
		hideYieldTokyoBayModal,
	} = useGlobalContext();

	 const handleYield = () => {
		hideYieldTokyoBayModal();
		handleYieldTokyoBay();
	}

	return <Wrapper>
		<div className="winner-container">
			<p>{`${tokyoBayPlayer.name}, do you yield?`}</p>
			<button className="btn submit-btn" onClick={handleYield}>Yes</button>
			<button className="btn submit-btn" onClick={hideYieldTokyoBayModal}>No</button>
		</div>
	</Wrapper>
}

const Wrapper = styled.div`
.winner-container {
	font-size: 2rem;
	font-weight: bold;
	padding: 3rem 4rem;
	border: solid 2px rgb(153, 222, 51);
	background-color: #fcfcf0;
	text-align: center;
	position: absolute;
	z-index: 1;
	top: 20rem;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	border-radius: 1rem;
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
`

export default YieldTokyoBayModal;