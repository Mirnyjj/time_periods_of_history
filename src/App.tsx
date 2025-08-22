import * as React from "react";
import styled from "styled-components";

const Main = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: 0 160px 0 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  border-right: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
`;

const CenterLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 1px;
    background-color: rgba(0.25, 0.25, 0.25, 0.1);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: rgba(0.25, 0.25, 0.25, 0.1);
  }
`;

const VectorLiner = styled.div`
  position: absolute;
  top: 177px;
  left: 0;
  background: linear-gradient(to top, #ef5da8, #3877ee);
  height: 120px;
  width: 5px;
`;

const H2 = styled.div`
  padding-top: 177px;
  padding-left: 78px;
  font-family: "PT Sans", sans-serif;
  font-style: normal;
  font-size: 56px;
  color: #42567a;
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 512px; // 256px radius * 2
  height: 512px;
  border: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
`;

const ContentSlider = styled.div`
  width: 960px;
  padding: 0 80px;
`;

const App = () => {
  return (
    <Main>
      <ContentContainer>
        <CenterLines />
        <VectorLiner />
        <H2>
          Исторические <br /> даты
        </H2>
        <Circle />
        <ContentSlider />
      </ContentContainer>
    </Main>
  );
};

export default App;
