import React from "react";
import styled from "styled-components";
import { breakpoints, historicalPeriods } from "../data";

type Props = {
  rotationAngle: number;
  dotsCount: number;
  activeDot: number;
  textVisible: boolean;
  handleDotClick: (index: number) => void;
};

export default function CircleComponent({
  rotationAngle,
  dotsCount,
  activeDot,
  textVisible,
  handleDotClick,
}: Props) {
  return (
    <CircleContainer>
      <Circle>
        <DotContainer $rotation={rotationAngle}>
          {historicalPeriods.map((item, index) => {
            const angle = index * (360 / dotsCount);
            const isActive = index === activeDot;

            return (
              <React.Fragment key={index}>
                <Dot
                  $active={isActive}
                  $angle={angle}
                  onClick={() => handleDotClick(index)}
                >
                  <DotLabel $counter={rotationAngle}>
                    <DotNumber $active={isActive}>{index + 1}</DotNumber>
                  </DotLabel>
                </Dot>
              </React.Fragment>
            );
          })}
        </DotContainer>
        <DotText $visible={textVisible}>
          {historicalPeriods[activeDot].categories}
        </DotText>
      </Circle>
    </CircleContainer>
  );
}

const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin: -100px 0;
  @media (max-width: ${breakpoints.mobileXL}) {
    display: none;
  }
`;

const Circle = styled.div`
  width: 512px;
  height: 512px;
  border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  border-radius: 50%;
  margin: 0 452px;
  flex-shrink: 0;
  position: relative;
`;

const DotContainer = styled.div<{ $rotation: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(${(props) => props.$rotation}deg);
  transition: transform 1s ease;
  z-index: 10;
`;

const Dot = styled.button<{ $active: boolean; $angle: number }>`
  position: absolute;
  width: ${(props) => (props.$active ? "56px" : "6px")};
  height: ${(props) => (props.$active ? "56px" : "6px")};
  background: ${(props) => (props.$active ? "#f4f5f9" : "#42567a")};
  border-radius: 50%;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => -props.$angle}deg)
    translate(256px) rotate(${(props) => props.$angle}deg);
  transform-origin: 0 0;

  &:hover {
    background-color: #f4f5f9;
    border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
    width: 56px;
    height: 56px;
  }
`;

const DotLabel = styled.div<{ $counter: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: rotate(${(p) => -p.$counter}deg);
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  color: #42567a;
`;

const DotNumber = styled.span<{ $active: boolean }>`
  color: #42567a;
  font-size: 16px;
  font-weight: 400;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 0.3s ease;

  ${Dot}:hover & {
    opacity: 1;
  }
`;

const DotText = styled.span<{ $visible: boolean }>`
  position: absolute;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #42567a;
  white-space: nowrap;
  transform: translate(486px, 59px);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.5s ease;
`;
