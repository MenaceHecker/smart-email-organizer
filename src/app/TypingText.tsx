// TypingText.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  delay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 150,
  erasingSpeed = 75,
  delay = 2000,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const text = texts[currentIndex];
    let charIndex = 0;

    const startTyping = () => {
      intervalId.current = setInterval(() => {
        setCurrentText(text.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex > text.length) {
          clearInterval(intervalId.current!); // Non-null assertion
          timeoutId.current = setTimeout(startErasing, delay);
        }
      }, typingSpeed);
    };

    const startErasing = () => {
      intervalId.current = setInterval(() => {
        setCurrentText(text.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex < 0) {
          clearInterval(intervalId.current!); // Non-null assertion
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          timeoutId.current = setTimeout(startTyping, 500);
        }
      }, erasingSpeed);
    };

    timeoutId.current = setTimeout(startTyping, 500);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [currentIndex, texts, typingSpeed, erasingSpeed, delay]);

  return <span>{currentText}</span>;
};

export default TypingText;