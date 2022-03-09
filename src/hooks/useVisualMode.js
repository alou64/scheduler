import { useState } from "react";

// custom hook to keep track mode as user interacts with app
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory(history => {
      const newHistory = [...history];
      replace ? newHistory.pop() : newHistory.push(newMode);
      setMode(newMode);
      return newHistory;
    });
  };

  const back = () => {
    setHistory(history => {
      const newHistory = [...history];
      newHistory.pop();
      if (newHistory.length === 0) {
        newHistory.push(initial);
        setMode(initial);
      } else {
        setMode(newHistory.pop());
      }
      return newHistory;
    });
  };

  return { mode, transition, back };
}
