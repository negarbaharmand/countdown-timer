import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSound from "use-sound";
import "./App.css";
import logoImage from "./assets/lexicon-logo.jfif";
import notifySound from "./assets/notify.mp3";

const formatWithLeadingZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [playSound] = useSound(notifySound, { volume: 0.9 }); // 90% of the original volume

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
              playSound();
              toast("Time's up! 🎉", {
                duration: 10000,
                position: "top-center",

                // Styling
                style: {
                  marginTop: "20px",
                },
                className: "",

                // Custom Icon
                icon: "🔔",

                // Change colors of success/error/loading icon
                iconTheme: {
                  primary: "#000",
                  secondary: "#fff",
                },

                // Aria
                ariaProps: {
                  role: "status",
                  "aria-live": "polite",
                },
              });
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, hours, minutes, seconds, playSound]);

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
        setHours(nonNegativeValue % 100);

        break;
      case "minutes":
        setMinutes(nonNegativeValue % 100);

        if (nonNegativeValue >= 60 && nonNegativeValue < 100) {
          setHours(Math.floor(nonNegativeValue / 60));
          setMinutes(nonNegativeValue % 60);
        } else {
          setHours(0);
        }
        break;
      case "seconds":
        setSeconds(nonNegativeValue % 100);

        if (nonNegativeValue >= 60 && nonNegativeValue < 100) {
          setMinutes(Math.floor(nonNegativeValue / 60));
          setSeconds(nonNegativeValue % 60);
        } else {
          setMinutes(0);
        }
        break;
      default:
        break;
    }
  };

  const handleBlur = (e, unit) => {
    // Parse the input value to an integer
    const parsedValue = parseInt(e.target.value, 10);

    // Ensure it's a non-negative value
    const nonNegativeValue = Math.max(0, parsedValue);

    // Set the state with the parsed integer value
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

    // Format the value with leading zeros before setting the state
    const formattedValue = formatWithLeadingZero(nonNegativeValue);

    // Update the input field with the formatted value
    e.target.value = formattedValue;
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen text-center">
        <div className="flex items-center justify-center text-4xl mt-8">
          <input
            type="number"
            className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
            value={formatWithLeadingZero(hours)}
            onChange={(e) => handleInputChange(e, "hours")}
            onBlur={(e) => handleBlur(e, "hours")}
          />
          <span className="text-4xl m-2">h</span>
          <input
            type="number"
            className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
            value={formatWithLeadingZero(minutes)}
            onChange={(e) => handleInputChange(e, "minutes")}
            onBlur={(e) => handleBlur(e, "minutes")}
          />
          <span className="text-4xl m-2">m</span>
          <input
            type="number"
            className="w-44 text-9xl text-center border-none outline-none p-2 m-2"
            value={formatWithLeadingZero(seconds)}
            onChange={(e) => handleInputChange(e, "seconds")}
            onBlur={(e) => handleBlur(e, "seconds")}
          />
          <span className="text-4xl m-2">s</span>
          <div className="flex">
            <button
              className="w-24 text-3xl bg-gray-900 hover:bg-stone-800 text-white font-semibold py-2 border-b-4 border-red-700 hover:border-red-500 rounded m-2"
              onClick={handleStartStop}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              className="w-24 text-3xl bg-gray-900 hover:bg-stone-800 text-white font-semibold py-2 border-b-4 border-red-700 hover:border-red-500 rounded m-2"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <div className="fixed top-0 w-full flex items-center justify-between h-28 bg-gray-900 text-white p-4">
        <img src={logoImage} alt="Logo" className="h-20 w-auto mr-2" />
      </div>
      <CountdownTimer />
      <Toaster />
    </div>
  );
}

export default App;
