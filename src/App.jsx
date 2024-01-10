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
    <div className="flex items-center justify-center h-screen text-center">
      <div className="flex items-center justify-center text-4xl mt-8">
        <input
          type="number"
          className="w-16 text-2xl text-center border-none outline-none p-2 m-2"
          value={hours}
          onChange={(e) => handleInputChange(e, "hours")}
        />
        <span className="text-2xl m-2">h</span>
        <input
          type="number"
          className="w-16 text-2xl text-center border-none outline-none p-2 m-2"
          value={minutes}
          onChange={(e) => handleInputChange(e, "minutes")}
        />
        <span className="text-2xl m-2">m</span>
        <input
          type="number"
          className="w-16 text-2xl text-center border-none outline-none p-2 m-2"
          value={seconds}
          onChange={(e) => handleInputChange(e, "seconds")}
        />
        <span className="text-2xl m-2">s</span>
        <div className="flex">
          <button
            className="p-2 m-2 text-lg bg-blue-500 text-white rounded"
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="p-2 m-2 text-lg bg-red-500 text-white rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
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
