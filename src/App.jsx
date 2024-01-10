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
    const nonNegativeValue = Math.max(0, value);

    switch (unit) {
      case "hours":
        setHours(nonNegativeValue);
        break;
      case "minutes":
        setMinutes(nonNegativeValue);
        break;
      case "seconds":
        setSeconds(nonNegativeValue);
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
          className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
          value={hours}
          onChange={(e) => handleInputChange(e, "hours")}
        />
        <span className="text-4xl m-2">h</span>
        <input
          type="number"
          className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
          value={minutes}
          onChange={(e) => handleInputChange(e, "minutes")}
        />
        <span className="text-4xl m-2">m</span>
        <input
          type="number"
          className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
          value={seconds}
          onChange={(e) => handleInputChange(e, "seconds")}
        />
        <span className="text-4xl m-2">s</span>
        <div className="flex">
          <button
            className="w-24 text-3xl bg-gray-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-2"
            onClick={handleStartStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="w-24 text-3xl bg-gray-800 hover:bg-stone-700 text-white font-semibold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-2"
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
