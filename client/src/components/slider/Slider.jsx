import React, { useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./Slider.css";
import { useEffect } from "react";
import { sliderItems } from "../../data";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { CDN_URL } from "../../utils/constants";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // const [titleColor, setTitleColor] = useState("black");

  const [direct, setDirect] = useState("");

  const [show, setShow] = useState(false);

  const ref = useRef(0);

  const titleRef = useRef(0);

  useEffect(() => {
    ref.current.style.transform = `translateX(${-slideIndex * 100}vw)`;
  }, [slideIndex]);

  const handleClick = (direction) => {
    setDirect(direction);
    setShow(true);

    direction === "left"
      ? setSlideIndex((slideIndex) =>
          slideIndex === 0 ? sliderItems.length - 1 : slideIndex - 1
        )
      : setSlideIndex((slideIndex) =>
          slideIndex === sliderItems.length - 1 ? 0 : slideIndex + 1
        );
  };

  return (
    <div className="slider-container">
      <div className="arrow arrow-left">
        <KeyboardArrowLeftOutlinedIcon onClick={() => handleClick("left")} />
      </div>
      <div className="slide-wrapper" ref={ref}>
        {sliderItems.map((slide, i) => (
          <div className="slide" style={{ backgroundColor: slide.bg }} key={slide.id}>
            <div className="imgContainer">
              <img
                loading={i === 0 ? "eager" : "lazy"}
                src={CDN_URL + "slider/" + (i + 1) + ".png"}
                fetchpriority="high"
                alt=""
              />
            </div>
            <div className="infoContainer">
              <Fade
                delay={50}
                appear
                opposite
                left={direct === "left"}
                right={direct === "right"}
                when={sliderItems[slideIndex] === slide}
              >
                <h1 className="slider-title">{slide.title}</h1>
              </Fade>
              <p className="slider-desc">{slide.desc}</p>
              <button className="slider-button">SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow arrow-right">
        <KeyboardArrowRightOutlinedIcon onClick={() => handleClick("right")} />
      </div>
    </div>
  );
};

export default Slider;
