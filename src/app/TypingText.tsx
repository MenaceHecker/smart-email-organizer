// TypingText.tsx
"use client";

import React, { useState, useEffect } from 'react';

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
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const type = async () => {
      const text = texts[currentIndex];
      for (let i = 0; i <= text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        setCurrentText(text.substring(0, i));
      }
      setIsTyping(false);
      timeoutId = setTimeout(erase, delay);
    };

    const erase = async () => {
      const text = texts[currentIndex];
      for (let i = text.length; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, erasingSpeed));
        setCurrentText(text.substring(0, i));
      }
      setIsTyping(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      timeoutId = setTimeout(type, 500);
    };

    if (isTyping) {
      timeoutId = setTimeout(type, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, isTyping, texts, typingSpeed, erasingSpeed, delay]);

  return <span>{currentText}</span>;
};

export default TypingText;