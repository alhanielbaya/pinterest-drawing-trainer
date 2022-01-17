import { useState, useEffect, useCallback } from "react";

type Prop = {
  interval: number;
  handlePicture: (n: boolean) => void;
  change: boolean;
  handleChange: (change: boolean) => void;
  stop: boolean;
};

function Timer({ interval, handlePicture, change, handleChange, stop }: Prop) {
  const [timer, setTimer] = useState(secondsToHms(interval));
  const [secondsLeft, setSeconds] = useState<number>(interval);

  function secondsToHms(d: number) {
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? String(h) + ":" : "";
    var mDisplay =
      m > 0 ? (m < 9 && h !== 0 ? `0${String(m)}:` : `${String(m)}:`) : "00:";
    var sDisplay = s > 0 ? (s > 9 ? String(s) : "0" + String(s)) : "00";
    return `${hDisplay}${mDisplay}${sDisplay}`;
  }

  const handleReset = useCallback(() => {
    setSeconds(interval);
    setTimer(secondsToHms(interval));
  }, [interval]);

  // Main Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondsLeft < 1) {
        handleChange(true);
        handlePicture(true);
        return;
      }
      setSeconds(secondsLeft - 1);
      setTimer(secondsToHms(secondsLeft));
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, handleChange, handlePicture]);

  // Handle timer reset
  useEffect(() => {
    if (change) {
      handleChange(false);
      handleReset();
    }
  }, [change, handleChange, handleReset]);

  const timerClass = ` tracking-wide text-2xl p-2 text-stone-100 bg-gray-900 rounded font-bold`;

  return stop ? (
    <h1 className={timerClass}>{secondsToHms(interval)}</h1>
  ) : (
    <h1 className={timerClass}>{timer}</h1>
  );
}

export default Timer;
