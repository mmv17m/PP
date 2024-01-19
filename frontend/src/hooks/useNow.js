import { useState, useEffect } from 'react';




export default function useNow(interval = 1000){
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return now;
};