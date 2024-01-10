import { useState, useEffect } from "react";
import "./App.css";

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              // Timer reached zero, stop the timer
              setIsRunning(false);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, hours, minutes, seconds]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleInputChange = (e, unit) => {
    const value = parseInt(e.target.value, 10) || 0;

    switch (unit) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="countdown-timer">
      <input
        type="number"
        className="timer-input"
        value={hours}
        onChange={(e) => handleInputChange(e, "hours")}
      />
      <span className="timer-separator">h</span>
      <input
        type="number"
        className="timer-input"
        value={minutes}
        onChange={(e) => handleInputChange(e, "minutes")}
      />
      <span className="timer-separator">m</span>
      <input
        type="number"
        className="timer-input"
        value={seconds}
        onChange={(e) => handleInputChange(e, "seconds")}
      />
      <span className="timer-separator">s</span>

      <div className="timer-buttons">
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <CountdownTimer />
    </div>
  );
}

export default App;
