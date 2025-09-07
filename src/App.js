import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header/Header';
import TicTacToe from './Component/TicTacToe/TicTacToe';
import NumberBaseball from './Component/NumberBaseball/NumberBaseball';
import ClickSpeedTest from './Component/ClickSpeedTest/ClickSpeedTest';
import CardGame from './Component/CardGame/CardGame';
import NumberGuess from './Component/NumberGuess/NumberGuess';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/2025ReactGame" element={<TicTacToe />} />
        <Route path="/baseball" element={<NumberBaseball />} />
        <Route path="/click" element={<ClickSpeedTest />} />
        <Route path="/card" element={<CardGame />} />
        <Route path="/guess" element={<NumberGuess />} />
      </Routes>
    </Router>
  );
}

export default App;
