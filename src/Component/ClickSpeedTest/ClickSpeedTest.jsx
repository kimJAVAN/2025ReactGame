import { useState, useRef } from 'react';
import './ClickSpeedTest.css';

function ClickSpeedTest() {
  const [started, setStarted] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [lastTime, setLastTime] = useState(null);
  const [logs, setLogs] = useState([]);
  const startTimeRef = useRef(null);

  const startGame = () => {
    setLastTime(null);
    setStarted(true);
    setClickActive(false);

    const delay = Math.floor(Math.random() * 3000) + 1000; // 1~4초 후 버튼 활성화
    setTimeout(() => {
      setClickActive(true);
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (!clickActive) return;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const timeStr = elapsed.toFixed(3);
    setLastTime(timeStr);
    setLogs(prevLogs => [...prevLogs, timeStr]); // 숫자만 기록
    setClickActive(false);
  };

  const handleRestart = () => {
    setLastTime(null);
    setStarted(false);
    setClickActive(false);
  };

  // 최고 기록 찾기
  const bestTime = logs.length > 0 ? Math.min(...logs.map(Number)).toFixed(3) : null;

  // 기록 정렬: 최고 기록 위로
  const sortedLogs = logs
    .slice()
    .sort((a, b) => Number(a) - Number(b));

  return (
    <div className="click-speed">
      <h1>Click Speed Test</h1>
      <div>
        {!started && <button onClick={startGame}>Start</button>}
      </div>

      {started && (
        <>
          <div>
            <button onClick={handleClick} disabled={!clickActive}>
              {clickActive ? 'Click!' : 'Wait...'}
            </button>
          </div>

          {lastTime !== null && <p>이번 반응시간: {lastTime}초</p>}

          <div className="logs">
            <h3>----- 기록 -----</h3>
            {sortedLogs.map((time, i) => (
              <p key={i}>
                {time}초 {Number(time) === Number(bestTime) ? '👑' : ''}
              </p>
            ))}
          </div>

          <div>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </>
      )}

      {/* 항상 기록 표시 */}
      {!started && logs.length > 0 && (
        <div className="logs">
          <h3>----- 기록 -----</h3>
          {sortedLogs.map((time, i) => (
            <p key={i}>
              {time}초 {Number(time) === Number(bestTime) ? '👑' : ''}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClickSpeedTest;
