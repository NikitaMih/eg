import { useEffect, useState } from "react";

export const useTimer = (initialSeconds: number) => {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    if (time > 0 && active) {
        setTimeout(setTime, 1000, time - 1); 
    } else {
        setActive(false);
    }
  }, [time, active]);

  const start = () => {
    setActive(true);
    setTime(initialSeconds);
  };

  return { time, start };
};
