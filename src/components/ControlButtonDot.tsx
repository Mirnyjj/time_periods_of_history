import * as React from "react";
import styled from "styled-components";
import { ButtonControl } from "./ButtonControl";
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
          side="left"
          onClick={() => handleControlClick("back")}
          size="50px"
          background="#e5e5e5"
          arrowColor="#42567a"
          arrowSize="8.84px"
          border={true}
        />
        <ButtonControl
          disabled={activeDot + 1 === dotsCount}
          side="right"
          onClick={() => handleControlClick("next")}
          size="50px"
          background="#e5e5e5"
          arrowColor="#42567a"
          arrowSize="8.84px"
          border={true}
        />
      </ButtonWrapper>
    </СontrolСontainer>
  );
}

const СontrolСontainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  gap: 20px;
  @media (max-width: ${breakpoints.mobileXL}) {
    padding-left: 0;
    gap: 10.67px;
    position: absolute;
    bottom: 13.33px;
  }
`;

const CounterPeriod = styled.span`
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #42567a;
  @media (max-width: ${breakpoints.mobileXL}) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: no-wrap;
  gap: 20px;
  @media (max-width: ${breakpoints.mobileXL}) {
    gap: 8.33px;
  }
`;
