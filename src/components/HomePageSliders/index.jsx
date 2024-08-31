import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PageSlider = () => {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      infinite={true}
      swipeable={false}
      draggable={false}
      showDots={false}
      transitionDuration={500}
      keyBoardControl={false}
      arrows={false}
    >
      <div>
        <img
          alt="google_logo"
          className="landingImages"
          src="/images/landpage/1.png"
        />
      </div>
      <div>
        <img
          alt="google_logo"
          className="landingImages"
          src="/images/landpage/2.png"
        />
      </div>
      <div>
        <img
          alt="google_logo"
          className="landingImages"
          src="/images/landpage/3.png"
        />
      </div>
    </Carousel>
  );
};

export default PageSlider;
