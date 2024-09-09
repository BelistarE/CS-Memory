import React, { useState, useEffect } from "react";
import dust2 from "../assets/background-images/dust2.jpg";
import mirage from "../assets/background-images/nuke.jpg";

const Slideshow = () => {
  const images = [dust2, mirage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slideshow ${index}`}
          className={`slideshow-image ${
            index === currentIndex
              ? "fade-in"
              : index === prevIndex
              ? "fade-out"
              : ""
          }`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
