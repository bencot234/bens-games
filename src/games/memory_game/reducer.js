import data from './data';

const reducer = (state, action) => {

    if (action.type === 'SHUFFLE_CARDS') {
        const shuffledCards = [...data].slice(0, action.payload);
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
    
        return {...state, cards: shuffledCards}
    }

    if (action.type === 'SHOW_BUTTONS') {
        return {...state, displayButtons: true}
    }
    if (action.type === 'HIDE_BUTTONS') {
        return {...state, displayButtons: false}
    }
    if (action.type === 'SHOW_CARDS') {
        return {...state, displayCards: true}
    }
    if (action.type === 'HIDE_CARDS') {
        return {...state, displayCards: false}
    }
    if (action.type === 'START_TIMER') {
        return {...state, isTimerRunning: true}
    }
    if (action.type === 'STOP_TIMER') {
        return {...state, isTimerRunning: false}
    }
    if (action.type === 'SET_FLIPPED_CARDS') {
        return {...state, flippedCards: action.payload}
    }
    if (action.type === 'SET_MATCHED_CARDS') {
        return {...state, matchedCards: action.payload}
    }
    // return state;
}

export default reducer;