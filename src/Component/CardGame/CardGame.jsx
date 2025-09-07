import { useState } from 'react';
import './CardGame.css';

function CardGame() {
  const initialCards = [... "AABBCCDDEEFFGGHHIIJJ"].sort(() => Math.random() - 0.5);
  const [cards, setCards] = useState(initialCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [finished, setFinished] = useState(false);
  const [flipCount, setFlipCount] = useState(0); // 실제 뒤집은 횟수
  const [logs, setLogs] = useState([]); // 게임 기록

  const totalPairs = cards.length / 2;
  const minFlips = totalPairs; // 최소 뒤집기 횟수 (한 번에 다 맞추면)

  const handleClick = (i) => {
    if (flipped.includes(i) || matched.includes(i) || finished) return;

    setFlipped([...flipped, i]);
    setFlipCount(prev => prev + 1); // 클릭 시마다 뒤집기 카운트

    if (flipped.length === 1) { // 두 장 뒤집었을 때 체크
      const a = flipped[0], b = i;
      if (cards[a] === cards[b]) {
        setMatched(prev => [...prev, a, b]);
      }
      setTimeout(() => setFlipped([]), 500);
    }
  };

  // 모든 카드 맞추면 finished true
  if (!finished && matched.length === cards.length) {
    setFinished(true);
    setLogs(prev => [...prev, `게임 완료! 실제 뒤집기: ${flipCount}, 최소 가능: ${minFlips}`]);
  }

  const handleRestart = () => {
    const shuffled = [... "AABBCCDDEEFFGGHHIIJJ"].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setFinished(false);
    setFlipCount(0);
  };

  return (
    <div className="card-game">
      <h1>Card Match Game</h1>
      <div className="card-grid">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`card ${flipped.includes(i) || matched.includes(i) ? 'flipped' : ''}`}
            onClick={() => handleClick(i)}
          >
            {flipped.includes(i) || matched.includes(i) ? c : '?'}
          </div>
        ))}
      </div>

      {finished && (
        <div className="message">
          <p className="win">🎉 축하합니다! 모든 카드를 맞췄습니다! 🎉</p>
          <p>총 뒤집기: {flipCount}, 최소 가능: {minFlips}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}

      {/* 기록 */}
      {logs.length > 0 && (
        <div className="logs">
          <h3>게임 기록</h3>
          {logs.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}
    </div>
  );
}

export default CardGame;
