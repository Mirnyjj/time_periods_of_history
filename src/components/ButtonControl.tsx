import * as React from "react";
import styled from "styled-components";
import { breakpoints } from "../data";

type Props = {
  size: string;
  background: string;
  side: string;
  arrowColor: string;
  border: boolean;
  arrowSize: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
function ButtonControlContainer({ className, disabled, onClick }: Props) {
  return <button className={className} disabled={disabled} onClick={onClick} />;
}
export const ButtonControl = styled(ButtonControlContainer)`
  ${(props) => (props.border ? "border: 1px solid #42567a;" : null)}
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: ${(props) => props.background};

  &::after {
    content: "";
    width: ${(props) => props.arrowSize};
    height: ${(props) => props.arrowSize};
    border-left: 2px solid ${(props) => props.arrowColor};
    border-bottom: 2px solid ${(props) => props.arrowColor};
    transform: ${(props) =>
      props.side === "left" ? "rotate(45deg)" : "rotate(-135deg)"};
    transition: all 0.3s ease;
  }

  &:disabled {
    border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
    cursor: not-allowed;
    background-color: #e5e5e5;

    &::after {
      border-left: 2px solid rgba(0.25, 0.25, 0.25, 0.1);
      border-bottom: 2px solid rgba(0.25, 0.25, 0.25, 0.1);
    }

    &:hover {
      background-color: #e5e5e5;
    }
  }

  &:not(:disabled):hover {
    background-color: #fff;
  }

  @media (max-width: ${breakpoints.mobileXL}) {
    width: 25px;
    height: 25px;
    &::after {
      width: 4.42px;
      height: 4.42px;
    }
  }
`;
