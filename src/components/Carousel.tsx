import * as React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { ButtonControl } from "./ButtonControl";
import { breakpoints } from "../data";
import { Swiper as SwiperType } from "swiper";

type Props = {
  item: {
    year: number;
    description: string;
  }[];
};

export default function Carousel({ item }: Props) {
  const uniqueId = item[0]?.year || "default";
  const swiperRef = React.useRef<SwiperType | null>(null);

  const updateSlidesOpacity = (swiper: SwiperType) => {
    swiper.slides.forEach((slide) => {
      // Приводим тип к any чтобы избежать ошибки TypeScript
      const slideElement = slide as any;
      const progress = Math.abs(slideElement.progress || 0);
      const opacity = Math.max(0.3, 1 - progress * 0.7); // Минимальная opacity 0.3
      (slide as HTMLElement).style.opacity = opacity.toString();
    });
  };
  return (
    <OuterContainer>
      <NavigationButton className={`swiper-button-${uniqueId}-prev`}>
        <ButtonControl
          side="left"
          size="40px"
          background="white"
          arrowColor="#3877EE"
          arrowSize="7.07px"
          border={true}
        />
      </NavigationButton>
      <Swiper
        modules={[Navigation, Pagination, FreeMode]}
        spaceBetween={80}
        slidesPerView={1}
        direction="horizontal"
        loop={true}
        freeMode={true}
        className="mySwiper"
        navigation={{
          nextEl: `.swiper-button-${uniqueId}-next`,
          prevEl: `.swiper-button-${uniqueId}-prev`,
        }}
        breakpoints={{
          320: {
            width: 166,
            spaceBetween: 25,
            watchSlidesProgress: true,
          },

          1280: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSlidesOpacity(swiper);
        }}
        onSlideChange={(swiper) => {
          updateSlidesOpacity(swiper);
        }}
      >
        {item.map((storage, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <YearText>{storage.year}</YearText>
              <DescriptionText>{storage.description}</DescriptionText>
            </SlideContent>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavigationButton className={`swiper-button-${uniqueId}-next`}>
        <ButtonControl
          side="right"
          size="40px"
          background="white"
          arrowColor="#3877EE"
          arrowSize="7.07px"
          border={true}
        />
      </NavigationButton>
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 56px 0;
  width: 100%;
  @media (max-width: ${breakpoints.mobileXL}) {
    gap: 0;
    padding: 0;
    width: 100%;
    position: absolute;
    justify-content: start;
  }
  .swiper {
    display: flex;
    max-width: 1240px;
    margin: 0;
    @media (max-width: ${breakpoints.mobileXL}) {
      gap: 0;
      max-width: 100vw;
      // min-width: 100vw;
      overflow: visible;
    }
  }
`;

const NavigationButton = styled.div`
  position: relative;
  z-index: 10;
  cursor: pointer;

  &.swiper-button-disabled {
    opacity: 0;
    pointer-events: none;
  }
  @media (max-width: ${breakpoints.mobileXL}) {
    display: none;
  }
`;

const SlideContent = styled.div`
  max-width: 400px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 480px) {
    min-width: 166px;
    max-width: 166px;
  }
`;

const YearText = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-size: 25px;
  color: #3877ee;
  line-height: 120%;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const DescriptionText = styled.div`
  font-family: "PT Sans", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #42567a;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 24px;
  }
`;
