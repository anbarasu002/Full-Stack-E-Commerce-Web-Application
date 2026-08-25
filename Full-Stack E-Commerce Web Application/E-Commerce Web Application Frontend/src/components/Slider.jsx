import React from "react";
import "./Slider.css";

import img1 from "../assets/Slider.jpeg";

const Slider = () => {
  return (
    <div className="slider">
      <img
        src={img1}
        alt="slider"
        className="slide-img"
      />
    </div>
  );
};

export default Slider;