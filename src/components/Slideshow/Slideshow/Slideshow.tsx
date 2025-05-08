import React, { useEffect, useState } from "react";
import { ApartmentType } from "../../../types/types";

interface SlideshowProps {
  images: ApartmentType[];
  interval?: number;
}

const Slideshow: React.FC<SlideshowProps> = ({ images = [], interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="slideshow">
      {images.map((src, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="overlay" />
    </div>
  );
};

export default Slideshow;
