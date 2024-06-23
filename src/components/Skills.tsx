"use client";
import { useEffect, useRef, useState } from "react";

export default function Skills({ words }: { words: string[] }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setCurrentWordIndex(index);
      index++;
      if (index >= words.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          refs.current.forEach((ref) => {
            if (ref) ref.classList.add("visible");
          });
        }, 400);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [words]);

  return (
    <div className="max-w-[35vw] md:w-auto h-auto flex flex-col md:space-y-[-1vw]">
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className={`skills-fade-in ${
            index === currentWordIndex ? "visible" : ""
          } text-[4vw] sm:text-[3.5vw] md:text-[2.7vw] lg:text-[1.9vw]`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
