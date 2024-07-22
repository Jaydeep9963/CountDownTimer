import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = parseInt(target.value, 10) || 0;
    const name = target.name;

    if (name === "minutes") {
      setMinutes(value);
    } else if (name === "seconds") {
      setSeconds(value);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const secondsRemaining = minutes * 60 + seconds;

  const timerColorClass =
    secondsRemaining <= 5
      ? "text-red-500"
      : secondsRemaining <= 10
        ? "text-orange-500"
        : "";

  const borderWidth =
    secondsRemaining < 10 ? Math.max(10 - secondsRemaining, 0) : 10;
  const borderColorClass =
    secondsRemaining <= 5
      ? "border-red-500"
      : secondsRemaining <= 10
        ? "border-orange-500"
        : "border-gray-400";

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <button
          onClick={toggleTimer}
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {showTimer ? "Hide" : "Timer"}
        </button>

        {showTimer && (
          <div className="mt-8">
            <div
              className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${borderColorClass}`}
              style={{ borderWidth: `${borderWidth}px` }}
            >
              <h2 className={`text-6xl font-bold ${timerColorClass}`}>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </h2>

              {secondsRemaining === 0 && isRunning && (
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium text-gray-600">
                  Time's up!
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <input
                type="number"
                min="0"
                name="minutes"
                value={minutes}
                onChange={handleInputChange}
                disabled={isRunning}
                className="w-20 text-center border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                name="seconds"
                value={seconds}
                onChange={handleInputChange}
                disabled={isRunning}
                className="w-20 text-center border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={startTimer}
                disabled={isRunning}
                className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Start
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
