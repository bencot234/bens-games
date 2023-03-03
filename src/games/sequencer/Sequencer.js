import { useState, useEffect } from 'react';
import data from './data';
import styled from 'styled-components';
import BackToGamesBtn from '../../BackToGamesBtn';
import './sequencer.css';

const getBest = () => {
  const best = JSON.parse(localStorage.getItem('best'));
  if (best) {
    return best;
  }
  return 0;
}

function App() {
  const [lights, setLights] = useState(data);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [best, setBest] = useState(getBest());
  const [allowReset, setAllowReset] = useState(true);
  const [speed, setSpeed] = useState(1000);
  const [delay, setDelay] = useState(500);
  const [clickDisabled, setClickDisabled] = useState(false);

  const turnOnLight = (index) => {
    const newLights = [...lights];
    if (index) newLights[index].on = true;
    setLights(newLights);
    setTimeout(() => {
      const newerLights = [...lights];
      if (index) newerLights[index].on = false;
      setLights(newerLights)
    }, delay);
  }

  const getRandomIndex = () => {
    return Math.ceil(Math.random() * lights.length -1);
  }

  const initialSequence = (repeat) => {
    if(repeat === 0) {
      return;
    }
    setSuccess(false);
    const nextLightIndex = getRandomIndex()
    turnOnLight(nextLightIndex);
    setSequence(oldSequence => [...oldSequence, nextLightIndex]);
    setTimeout(() => {
      initialSequence(repeat -1)
    }, 1000);    
  }

  const startGame = () => {
    setShowGameOver(false);
    setGameStarted(true);
    setSpeed(1000);
    setDelay(500);
    setUserSequence([]);
    setSequence([]);
    setLights(data);
    setAllowReset(false);
    if (allowReset) {
      initialSequence(3);
    }
    setClickDisabled(true)
    setTimeout(() => {
      setAllowReset(true);
      setClickDisabled(false);
    }, 2500);
  }

  useEffect(() => {
    if (sequence.length > 5) setSpeed(800);
    if (sequence.length > 7) setSpeed(600);
    if (sequence.length > 9) setSpeed(400);
    if (sequence.length > 11) setSpeed(300);
    if (sequence.length > 13) setSpeed(200);
    if (sequence.length > 15) setSpeed(100);
  }, [sequence.length]);

  useEffect(() => {
    userSequence.map((light, i) => {
      if (light !== sequence[i]) handleFail();
    })
  }, [userSequence.length])

  useEffect(() => {
    if (speed === 100) {
      setDelay(70);
    } else {
      setDelay(speed/2);
    }
  }, [speed])
 
  const specificSequence = (sequence, index) => {
    turnOnLight(sequence[index]);
    setTimeout(() => {
      specificSequence(sequence, index + 1);
    }, speed)
  }

  const handleClick = (index) => {
    if (!clickDisabled) {
      turnOnLight(index);
      setUserSequence(oldUserSequence => [...oldUserSequence, index]);
    }
  }

  const handleSuccess = () => {
    setSequence(prevSequence => [...prevSequence, getRandomIndex()]);
    setUserSequence([]);
    setSuccess(true);
  }

  const handleFail = () => {
    setShowGameOver(true);
    setGameStarted(false);
    const score = sequence.length -1;
    if (score > best && score >= 3) {
      setBest(score);
      localStorage.setItem('best', JSON.stringify(score));
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        specificSequence(sequence, 0);
        setClickDisabled(true);
        let timeDisabled = (speed * sequence.length) - delay;
        setTimeout(() => {
          setClickDisabled(false);
        }, timeDisabled)
      }, 1000)
      setSuccess(false);
    }
  }, [success])
 
  useEffect(() => {
    if (sequence.length > 0 && userSequence.length === sequence.length) {
      const isEqual = sequence.every((value, i) => value === userSequence[i]);
      if (isEqual) {
        handleSuccess();
      } else {
        handleFail();
      }
    }
  }, [userSequence, sequence]);

  return (
    <>
      <Wrapper>
        <div className='title-container'>
          <p className='title'>{showGameOver ? 'Game Over' : 'Sequencer'}</p>
          <div className='underline'></div>
        </div>
        <div className='container'>
          {lights.map((light, index) => {
            const {id, on, color} = light;
            return <div
              key={id}
              className={`light ${on ? color : ''}`}
              onClick={() => handleClick(index)}
            ></div>
          })}
          <button className='start-btn' onClick={() => startGame()}>{gameStarted ? 'Retry' : 'Start'}</button>
        </div>
        {best && <div className='best'>best: {best}</div>}
      </Wrapper>
      <BackToGamesBtn/>
    </>
  );
}

const Wrapper = styled.div`
.light {
  height: 100px;
  width: 100px;
  background-color: #eee;
  border-radius: 1rem;
  margin: 10px;
  cursor: pointer;
}
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 0 auto;
  width: 240px;
  text-align: center;
  margin-top: 2rem;
  position: relative;
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
.game-over {
  display: inline-block;
}
.hide {
  display: none;
}
.start-btn {
  position: absolute;
  top: 80px;
  left: 80px;
  padding: 30px 15px;
  border-radius: 50%;
  font-size: normal;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: rgb(225, 146, 0);
  color: black;
  padding-top: 30px;
  padding-bottom: 30px;
  cursor: pointer;
  transition: 0.5s;
  border: 3px solid transparent;
  width: 80px;
  height: 80px;
  padding-left: 13px;
}
.start-btn:hover {
  transition: 0.5s;
  // border: 3px solid black;
  letter-spacing: 0;
  padding-left: 15px;
}
.title-container {
  text-align: center;
  font-size: 40px;
  letter-spacing: 2px;
}
.underline {
  background-color: black;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  margin: 0 auto;
}
.best {
  width: 220px;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: small;
}
`

export default App;
