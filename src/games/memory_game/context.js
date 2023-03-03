import React, { useEffect, useContext, useReducer } from 'react'
import data from './data'
import reducer from './reducer'

const initialState = {
    cards: data,
    displayButtons: true,
    displayCards: false,
    isTimerRunning: false,
    flippedCards: [],
    matchedCards: [],
    winState: false,
    secondsElapsed: 0,
}


const GameContext = React.createContext()

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
 
    const shuffleCards = (num) => {
        dispatch({type: 'SHUFFLE_CARDS', payload: num})
    }

    const showButtons = () => {
        dispatch({type: 'SHOW_BUTTONS'})
    }
    const hideButtons = () => {
        dispatch({type: 'HIDE_BUTTONS'})
    }
    const showCards = () => {
        dispatch({type: 'SHOW_CARDS'})
    }
    const hideCards = () => {
        dispatch({type: 'HIDE_CARDS'})
    }

    const startTimer = () => {
        dispatch({type: 'START_TIMER'})
    }
    const stopTimer = () => {
        dispatch({type: 'STOP_TIMER'})
    }

    const setFlippedCards = (flipped) => {
        dispatch({type: 'SET_FLIPPED_CARDS', payload: flipped})
    }
    const setMatchedCards = (matched) => {
        dispatch({type: 'SET_MATCHED_CARDS', payload: matched})
    }


	const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

		return `${formattedMinutes}:${formattedSeconds}`;
	};
    
  return (
    <GameContext.Provider value={{
        ...state,
        shuffleCards,
        showButtons,
        hideButtons,
        showCards,
        hideCards,
        startTimer,
        stopTimer,
        formatTime,
        setFlippedCards,
        setMatchedCards,
    }}>{children}</GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}
