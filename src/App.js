import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Intro from './games/king_of_tokyo/Intro';
import Game from './games/king_of_tokyo/Game';
import HigherOrLower from './games/higher_or_lower/HigherOrLower';
import { AppProvider } from './games/king_of_tokyo/context';
import Sequencer from './games/sequencer/Sequencer';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/king-of-tokyo' element={<Intro/>}/>
          <Route path="/king-of-tokyo/game" element={
            <AppProvider>
              <Game/>
            </AppProvider>
          }/>
          <Route path='/higher-or-lower' element={<HigherOrLower/>}/>
          <Route path='/sequencer' element={<Sequencer/>}/>
        </Routes>
      </Router>
  );
}

export default App;
