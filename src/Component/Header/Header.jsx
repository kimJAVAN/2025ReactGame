import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/2025ReactGame" className={({ isActive }) => isActive ? 'active' : ''}>TicTacToe</NavLink>
        <NavLink to="/baseball" className={({ isActive }) => isActive ? 'active' : ''}>Number Baseball</NavLink>
        <NavLink to="/click" className={({ isActive }) => isActive ? 'active' : ''}>Click Speed</NavLink>
        <NavLink to="/card" className={({ isActive }) => isActive ? 'active' : ''}>Card Game</NavLink>
        <NavLink to="/guess" className={({ isActive }) => isActive ? 'active' : ''}>Number Guess</NavLink>
      </nav>
    </header>
  );
}

export default Header;
