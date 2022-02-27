import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const stack = [initial];

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) setHistory(() => stack.push(newMode));
  };

  const back = () => {
    setHistory(() => {
      setMode(stack.pop());
      if (stack.length === 0) stack.push(initial);
    });
  };

  return { mode, transition, back };
};
