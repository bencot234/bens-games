import { Link } from 'react-router-dom';

const BackToGamesBtn = () => {
  return (
		<Link to='/'>
			<button className='back-to-games'>
				back to games
			</button>
		</Link>
  )
}

export default BackToGamesBtn
