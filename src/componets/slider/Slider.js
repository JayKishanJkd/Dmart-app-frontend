import React, { useEffect, useState, useRef } from "react";
import "./Slider.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slideLength = sliderData.length;
  const autoScroll = true;
  const sliderInterval = useRef(null); // Use useRef for persistent value
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        sliderInterval.current = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(sliderInterval.current);
  }, [currentSlide, intervalTime, autoScroll]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prew" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;

        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <button
                    className="--btn-primary" // Corrected typo (--btn--btn-primary to --btn-primary)
                    onClick={() => navigate("/shop")}
                  >
                    show now
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
