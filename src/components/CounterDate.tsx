import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

type DateHistory = {
  old: number;
  new: number;
};

interface CounterDateProps {
  date: DateHistory;
  duration: number;
  isAnimating: boolean;
  left: boolean;
}

export const CounterDate = ({
  date,
  duration = 2000,
  isAnimating,
  left,
}: CounterDateProps) => {
  const [count, setCount] = useState(date.old);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime; // Запоминаем время начала анимации

      const elapsed = currentTime - startTime; // Сколько времени прошло
      const progress = Math.min(elapsed / duration, 1); // Прогресс от 0 до 1

      // Easing функция для плавности
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Правильный расчет текущего значения
      const currentCount = Math.floor(
        date.old + (date.new - date.old) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(date.new);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating, date, duration]);

  return <DateContainer $left={left}>{count}</DateContainer>;
};

const DateContainer = styled.div<{ $left: boolean }>`
  color: ${(props) => (props.$left ? "#5f60e8" : "#eb5fa6")};
  position: relative;
  overflow: hidden;
  height: auto;
`;
