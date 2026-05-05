import { useEffect, useRef, useState } from "react";

const SKILLS_FONT_SIZE = "clamp(0.9rem, 2.5vw + 0.4rem, 1.5rem)";

export default function Skills({ words }: { words: string[] }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

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
    <div
      className="max-w-[35vw] md:w-auto h-auto flex flex-col space-y-[-0.3vw]"
      style={{ fontSize: SKILLS_FONT_SIZE }}
    >
      {words.map((word: string, index: number) => (
        <span
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className={`skills-fade-in ${
            index === currentWordIndex ? "visible" : ""
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
