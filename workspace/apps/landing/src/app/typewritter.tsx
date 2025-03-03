"use client";

import { useState, useEffect } from "react";

export default function Typewriter() {
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);

  const sequence = [
    { text: "Hello World!", type: true, delay: 3000 }, // Type "Hello World"
    { count: 7, type: false, delay: 500 }, // Backspace " World"
    { text: " New", type: true, delay: 500 }, // Type " New"
    { text: " World!", type: true, delay: 500 } // Type " World"
  ];

  useEffect(() => {
    if (step >= sequence.length) return;

    const action = sequence[step];

    if (action.type) {
      // Typing effect
      if (action.text && index < action.text.length) {
        const timeout = setTimeout(() => {
          setText((prev) => prev + action.text[index]);
          setIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setStep((prev) => prev + 1);
          setIndex(0);
        }, action.delay);
      }
    } else {
      // Backspacing effect
      if (action.count !== undefined && index < action.count) {
        const timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setStep((prev) => prev + 1);
          setIndex(0);
        }, action.delay);
      }
    }
  }, [step, index]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setText(""); // Reset text
        setStep(0); // Restart animation
        setIndex(0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <h1 className="text-3xl sm:text-4xl font-mono">
      {text}
      <span className="border-r-2 border-black animate-blink pl-1"/>
    </h1>
  );
}
