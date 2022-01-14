import { useState, useRef, useEffect } from "react";

import { Image } from "./ImageP";

type Prop = {
  interval: number;
  handlePicture: () => void;
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

  function handleReset() {
    setSeconds(interval);
    setTimer(secondsToHms(interval));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondsLeft < 1) {
        handleChange(true);
        return;
      }
      setSeconds(secondsLeft - 1);
      setTimer(secondsToHms(secondsLeft));
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (change) {
      handleChange(false);
      handleReset();
      handlePicture();
    }
    // if (intervalRef.current) clearTimeout(intervalRef.current);
  }, [change]);

  return stop ? (
    <h1 className="text-large p-2 text-stone-100">{secondsToHms(interval)}</h1>
  ) : (
    <h1 className="tracking-wide text-large p-2 text-stone-100 bg-gray-900 rounded">
      {timer}
    </h1>
  );
}

export default Timer;
