import * as React from "react";
import styled from "styled-components";
import { breakpoints, historicalPeriods } from "./data";
import { CounterDate } from "./components/CounterDate";
import CircleComponent from "./components/Circle";
import ControlButtonDot from "./components/ControlButtonDot";

const App = () => {
  const [activeDot, setActiveDot] = React.useState(0);
  const [textVisible, setTextVisible] = React.useState(true);
  const dotsCount = historicalPeriods.length;
  const [rotationAngle, setRotationAngle] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [prevStartYear, setPrevStartYear] = React.useState(
    historicalPeriods[0].yearStart
  );
  const [prevEndYear, setPrevEndYear] = React.useState(
    historicalPeriods[0].yearEnd
  );

  React.useEffect(() => {
    const step = 360 / dotsCount;
    setRotationAngle(315 + activeDot * step);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === activeDot) return;
    setIsAnimating(true);
    // Сохраняем предыдущие значения
    setPrevStartYear(historicalPeriods[activeDot].yearStart);
    setPrevEndYear(historicalPeriods[activeDot].yearEnd);
    // Сначала скрываем текст
    setTextVisible(false);

    // Ждем завершения анимации исчезновения, затем меняем активную точку
    setTimeout(() => {
      const step = 360 / dotsCount;
      const angle = index * step;
      setRotationAngle((prev) => {
        const target = 315 + angle;
        let delta = target - prev;
        delta = ((delta + 540) % 360) - 180;
        return prev + delta;
      });

      setActiveDot(index);

      // Показываем текст после завершения вращения
      setTimeout(() => {
        setTextVisible(true);
        setIsAnimating(false);
      }, 1000);
    }, 500);
  };

  return (
    <Main>
      <ContentContainer>
        <CenterLines />
        <VectorLiner />
        <H2>
          Менеджер <br /> изображений
        </H2>
        <CircleComponent
          rotationAngle={rotationAngle}
          dotsCount={dotsCount}
          activeDot={activeDot}
          textVisible={textVisible}
          handleDotClick={handleDotClick}
        />
        <DateWrapper>
          <CounterDate
            date={{
              old: prevStartYear,
              new: historicalPeriods[activeDot].yearStart,
            }}
            isAnimating={isAnimating}
            duration={1000}
            left={true}
          />
          <CounterDate
            date={{
              old: prevEndYear,
              new: historicalPeriods[activeDot].yearEnd,
            }}
            isAnimating={isAnimating}
            duration={1000}
            left={false}
          />
        </DateWrapper>
        <ControlButtonDot
          activeDot={activeDot}
          dotsCount={dotsCount}
          handleDotClick={handleDotClick}
        />
        {/* <ContentSlider /> */}
      </ContentContainer>
    </Main>
  );
};

export default App;

const Main = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f4f5f9;
  @media (max-width: ${breakpoints.mobileXL}) {
    min-height: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  margin: 0 160px 0 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  border-right: 1px solid rgba(0.25, 0.25, 0.25, 0.1);
  @media (max-width: ${breakpoints.mobileXL}) {
    border: none;
    margin: 0 20px 0 27px;
  }
`;

const CenterLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
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
  @media (max-width: ${breakpoints.mobileXL}) {
    display: none;
  }
`;

const VectorLiner = styled.div`
  position: absolute;
  top: 177px;
  left: 0;
  background: linear-gradient(to top, #ef5da8, #3877ee);
  height: 120px;
  width: 5px;
  @media (max-width: ${breakpoints.mobileXL}) {
    display: none;
  }
`;

const H2 = styled.div`
  padding-top: 177px;
  padding-left: 78px;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 56px;
  line-height: 120%;
  color: #42567a;
  margin: 0;
  @media (max-width: ${breakpoints.mobileXL}) {
    padding-top: 59px;
    padding-left: 0;
    font-size: 20px;
  }
`;

const DateWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: flex;
  flex-wrap: nowrap;
  gap: 66px;
  transform: translate(-50%, -50%);
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  font-size: 200px;
  line-height: 160px;
  white-space: nowrap;
  @media (max-width: ${breakpoints.mobileXL}) {
    position: unset;
    padding: 56px 0 58px 0;
    font-size: 56px;
    line-height: normal;
    leter-spacing: -2%;
    gap: 23px;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    border-bottom: 1px solid #c7cdd9;
    margin-bottom: 20px;
  }
`;

const ContentSlider = styled.div`
  width: 100%;
  padding: 0 80px;
  margin: 0 auto;
  border: 1px solid #c7cdd9;
`;
