import React, { useRef, useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import "./Slider.css";
import { useEffect } from "react";
import { sliderItems } from "../../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const ref = useRef(0);
  const te = useRef("black");
  const bg = useRef("white");

  useEffect(() => {
    ref.current.style.transform = `translateX(${-slideIndex * 100}vw)`;
    console.log(ref.current.style);
  }, [slideIndex]);

  // setInterval(() => {
  //   console.log("done");
  //   console.log(te.current.style?.color)
  //   if (te.current.style?.color===undefined) {}
  //   else
  //     te.current.style.color =
  //       te.current.style.color === "red" ? "black" : "red";
  // }, 500);

  const handleClick = (direction) => {
    console.log(direction);
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
        {sliderItems.map((slide) => (
          <div className="slide" style={{ backgroundColor: slide.bg }}>
            <div className="imgContainer">
              <img src={slide.img} />
            </div>
            <div className="infoContainer">
              <h1 className="slider-title" ref={te}>
                {slide.title}
              </h1>
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
