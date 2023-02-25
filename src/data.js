import kingOfTokyo from './images/king-of-tokyo.png';
import higherOrLower from './images/higher-or-lower.png';
import memoryGame from './images/memory-game.png';
import sequencer from './images/sequencer.png';

const games = [
    {
        id: 1,
        name: 'King of Tokyo',
        link: 'king-of-tokyo',
        image: kingOfTokyo,
        background: 'white',
        delay: '',
    },
    {
        id: 2,
        name: 'Higher Or Lower',
        link: 'higher-or-lower',
        image: higherOrLower,
        background: 'white',
        delay: '1s',
    },
    {
        id: 3,
        name: 'Memory Game',
        link: 'memory-game',
        image: memoryGame,
        background: 'white',
        delay: '2s',
    },
    {
        id: 4,
        name: 'Sequencer',
        link: 'sequencer',
        image: sequencer,
        background: 'rgb(225, 146, 0)',
        delay: '3s',
    },
];

export default games;