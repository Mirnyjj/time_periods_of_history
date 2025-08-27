import * as React from "react";
import styled from "styled-components";
import { breakpoints } from "../data";

type Props = {
  activeDot: number;
  dotsCount: number;
  handleDotClick: (index: number) => void;
};

export default function ControlButtonDot({
  activeDot,
  dotsCount,
  handleDotClick,
}: Props) {
  const handleControlClick = (direction: string) => {
    if (direction === "next") {
      const index = activeDot + 1 === dotsCount ? activeDot : activeDot + 1;
      handleDotClick(index);
    } else {
      const index = activeDot === 0 ? activeDot : activeDot - 1;
      handleDotClick(index);
    }
  };

  return (
    <СontrolСontainer>
      <CounterPeriod>
        {dotsCount}/{activeDot + 1}
      </CounterPeriod>
      <ButtonWrapper>
        <ButtonControl
          disabled={activeDot === 0}
          $side="left"
          onClick={() => handleControlClick("back")}
        />
        <ButtonControl
          disabled={activeDot + 1 === dotsCount}
          $side="right"
          onClick={() => handleControlClick("next")}
        />
      </ButtonWrapper>
    </СontrolСontainer>
  );
}

const СontrolСontainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 78px;
  gap: 20px;
  @media (max-width: ${breakpoints.mobileXL}) {
    padding-left: 0;
  }
`;

const CounterPeriod = styled.span`
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #42567a;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: no-wrap;
  gap: 20px;
`;

const ButtonControl = styled.button<{ $side: string }>`
  border: 1px solid #42567a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: #f4f5f9;

  &::after {
    content: "";
    width: 8.84px;
    height: 8.84px;
    border-left: 2px solid #42567a;
    border-bottom: 2px solid #42567a;
    transform: ${(props) =>
      props.$side === "left" ? "rotate(45deg)" : "rotate(-135deg)"};
    transition: all 0.3s ease;
  }

  &:disabled {
    border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
    cursor: not-allowed;
    background-color: #f4f5f9;

    &::after {
      border-left: 2px solid rgba(0.25, 0.25, 0.25, 0.1);
      border-bottom: 2px solid rgba(0.25, 0.25, 0.25, 0.1);
    }

    &:hover {
      background-color: #f4f5f9;
    }
  }

  &:not(:disabled):hover {
    background-color: #fff;
  }
`;
