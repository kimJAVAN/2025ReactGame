import { useState } from 'react';
import './NumberBaseball.css';

function NumberBaseball() {
  const [answer, setAnswer] = useState(generateNumber());
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (finished) return;
    if (input.length !== 4) return alert('4자리 숫자를 입력하세요!');
    
    const result = getResult(answer, input);
    const newLogs = [...logs, `${input} → ${result}`];
    setLogs(newLogs);
    const newAttempt = attempt + 1;
    setAttempt(newAttempt);

    if (result === '4S 0B') {
      setMessage('🎉 축하합니다! 🎉');
      setFinished(true);
    } else if (newAttempt >= 15) {
      setMessage(`💀 패배! 정답은 ${answer}였습니다.`);
      setFinished(true);
    }

    setInput('');
  };

  const handleRestart = () => {
    setAnswer(generateNumber());
    setInput('');
    setLogs([]);
    setAttempt(0);
    setFinished(false);
    setMessage('');
  };

  return (
    <div className="number-baseball">
      <h1>Number Baseball Game</h1>
    
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g,''))}
          maxLength={4}
          disabled={finished}
        />
        <button type="submit" disabled={finished}>Check</button>
      </form>
      <p>시도: {attempt} / 15</p>

      {message && <p className={`message ${message.includes('축하') ? 'win' : 'lose'}`}>{message}</p>}

      <div className="logs">
        {logs.map((log, i) => <p key={i}>{log}</p>)}
      </div>
      <div>
        {finished && <button className="restart" onClick={handleRestart}>다시 시작</button>}
      </div>
    </div>
  );
}

// 숫자 생성 (중복 없는 4자리)
function generateNumber() {
  const numbers = [];
  while (numbers.length < 4) {
    const n = Math.floor(Math.random() * 10);
    if (!numbers.includes(n)) numbers.push(n);
  }
  return numbers.join('');
}

// strike/ball 계산
function getResult(answer, guess) {
  let strike = 0, ball = 0;
  const answerArr = answer.split('');
  const guessArr = guess.split('');

  // Strike 체크
  for (let i = 0; i < 4; i++) {
    if (guessArr[i] === answerArr[i]) {
      strike++;
      answerArr[i] = null;
      guessArr[i] = null;
    }
  }

  // Ball 체크
  for (let i = 0; i < 4; i++) {
    if (guessArr[i] !== null) {
      const idx = answerArr.indexOf(guessArr[i]);
      if (idx !== -1) {
        ball++;
        answerArr[idx] = null;
      }
    }
  }

  return `${strike}S ${ball}B`;
}

export default NumberBaseball;
