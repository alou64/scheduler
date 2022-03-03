import { useState } from "react";

// custom hook to keep track mode as user interacts with app
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory(history => {
      replace ? history.pop() : history.push(newMode);
      setMode(newMode);
      return history;
    });
  };

  const back = () => {
    setHistory(history => {
      history.pop();
      if (history.length === 0) {
        history.push(initial);
        setMode(initial);
      } else {
        setMode(history.pop());
      }
      return history;
    });
  };

  return { mode, transition, back };
}
