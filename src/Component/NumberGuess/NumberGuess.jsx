import { useState } from 'react';
import './NumberGuess.css';

function NumberGuess() {
  const [target, setTarget] = useState(Math.floor(Math.random()*100)+1);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [finished, setFinished] = useState(false);
  const maxAttempt = 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (finished) return;
    const num = Number(input);
    if (num < 1 || num > 100) return alert('1~100 숫자를 입력하세요!');
    let msg = '';
    if (num < target) msg = 'Up!';
    else if (num > target) msg = 'Down!';
    else msg = 'Correct!';

    setLogs([...logs, `${num} → ${msg}`]);
    setAttempt(attempt+1);
    setInput('');

    if (msg === 'Correct!') setFinished(true);
    else if (attempt+1 >= maxAttempt) setFinished(true);
  };

  const handleRestart = () => {
    setTarget(Math.floor(Math.random()*100)+1);
    setLogs([]);
    setInput('');
    setAttempt(0);
    setFinished(false);
  };

  return (
    <div className="number-guess">
      <h1>Number Guess (1~100)</h1>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e)=>setInput(e.target.value.replace(/[^0-9]/g,''))} disabled={finished}/>
        <button type="submit" disabled={finished}>Guess</button>
      </form>
            <p>시도: {attempt} / {maxAttempt}</p>
      <div className="logs">{logs.map((l,i)=><p key={i}>{l}</p>)}</div>
      {finished && (
        <div className={`message ${logs[logs.length-1].includes('Correct') ? 'win' : 'lose'}`}>
          {logs[logs.length-1].includes('Correct') ? '🎉 축하합니다! 🎉' : `💀 실패! 정답은 ${target}였습니다.`}
            {/* {logs[logs.length-1].includes('Correct') && attempt < 3 && <p>엄청나네요! 3번 만에 맞추셨군요!</p>} */}
          <div>
            <button className="restart" onClick={handleRestart}>다시 시작</button>
          </div>
      
        </div>
      )}

    </div>
  );
}

export default NumberGuess;
