import { useEffect, useState } from "react";

export default function Timer({ timer, setTimers, onDeleteTimer }) {
  const [seconds, setSeconds] = useState(timer.timerTime);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0 && !hasUpdated) {
      setHasUpdated(true);
      setTimers((prev) =>
        prev.map((prevTimer) =>
          prevTimer.timerId == timer.timerId
            ? { ...prevTimer, timerTime: 0 }
            : prevTimer
        )
      );
    }
  }, [seconds, hasUpdated, setTimers, timer]);

  function formatTimes(sec) {
    const h = Math.floor(sec / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return [h, m, s];
  }

  return (
    <div className="flex items-center text-[#a9aebb] px-5 py-3 shadow-lg">
      <div className="flex-1">
        <h5 className="text-2xl font-medium">{timer.timerName}</h5>
        <div className="text-4xl font-light">
          {formatTimes(seconds)[0]}:{formatTimes(seconds)[1]}:
          {formatTimes(seconds)[2]}
        </div>
      </div>
      <div>
        <div
          className="text-2xl hover:text-[#545d78] hover:scale-115 cursor-pointer transition"
          onClick={() => onDeleteTimer(timer.timerId)}
        >
          &times;
        </div>
      </div>
    </div>
  );
}
