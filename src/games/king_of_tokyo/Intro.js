import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './images/logo.jpg'
import 'animate.css'
import styled from 'styled-components'

const Intro = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/king-of-tokyo/game')
		}, 7000)
	}, [])

	return (
		<Wrapper>
			<div className="logo">
				<img src={logo} alt="logo" className="animate__animated animate__bounceInDown" />
				<p className="animate__animated animate__fadeIn animate__delay-1s">simplified</p>
				<div className="animate__animated animate__fadeIn animate__delay-2s rules-link">
					<p>Find the rules <a href="https://cdn.1j1ju.com/medias/f9/2f/9b-king-of-tokyo-rulebook.pdf" target="_blank">here</a></p>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
.logo {
	text-align: center;
	margin-top: 10rem;
}

.logo p {
	text-transform: uppercase;
	letter-spacing: 3px;
}

.rules-link {
	margin-top: 3rem;
	letter-spacing: 2px;
	font-size: small;
}
`

export default Intro
