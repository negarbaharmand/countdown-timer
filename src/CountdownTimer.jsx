import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSound from "use-sound";
import notifySound from "./assets/notify.mp3";

const formatWithLeadingZero = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
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
      document.title = `${hours}:${minutes}:${seconds}`;
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
              document.title = "Time's up!";
              playSound();
              toast("Time's up! 🎉", {
                duration: 5000,
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
    document.title = `Countdown-Timer`;
  };

  const handleSelectChange = (value, unit) => {
    const intValue = parseInt(value, 10) || 0;
    const nonNegativeValue = Math.max(0, intValue);

    switch (unit) {
      case "hours":
        setHours(nonNegativeValue % 100);
        break;
      case "minutes":
        setMinutes(nonNegativeValue % 100);
        break;
      case "seconds":
        setSeconds(nonNegativeValue % 100);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen text-center">
        <div className="flex items-center justify-center text-4xl mt-8">
          <select
            className="w-40 text-9xl text-center border-none outline-none m-2 origin-bottom bottom-0 transform"
            value={hours}
            onChange={(e) => handleSelectChange(e.target.value, "hours")}
          >
            {Array.from({ length: 100 }, (_, i) => i).map((hour) => (
              <option key={hour} value={hour} className="text-sm">
                {formatWithLeadingZero(hour)}
              </option>
            ))}
          </select>
          <span className="text-4xl m-2">h</span>
          <select
            className="w-40 text-9xl text-center border-none outline-none m-2"
            value={minutes}
            onChange={(e) => handleSelectChange(e.target.value, "minutes")}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <option key={minute} value={minute}>
                {formatWithLeadingZero(minute)}
              </option>
            ))}
          </select>
          <span className="text-4xl m-2">m</span>
          <select
            className="w-40 text-9xl text-center border-none outline-none m-2"
            value={seconds}
            onChange={(e) => handleSelectChange(e.target.value, "seconds")}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((second) => (
              <option key={second} value={second}>
                {formatWithLeadingZero(second)}
              </option>
            ))}
          </select>
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

export default CountdownTimer;
