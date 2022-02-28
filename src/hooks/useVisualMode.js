import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const stack = [initial];

  const transition = (newMode, replace = false) => {
    setHistory(stack => {
      replace ? stack.pop() : stack.push(newMode);
      setMode(newMode);
      return stack;
    });
  };

  const back = () => {
    setHistory(stack => {
      stack.pop();
      setMode(stack.pop());
      if (stack.length === 0) stack.push(initial);
      return stack;
    });
  };

  return { mode, transition, back };
};
