import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  images: string[];
  onClose: () => void;
  initialIndex: number;
  alternative: string;
};

const Modal: React.FC<Props> = ({ images, onClose, initialIndex, alternative }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-main-image">
          <button className="nav-btn prev-btn" onClick={goToPrevious}><FontAwesomeIcon icon={faChevronLeft}/></button>
          <img
            src={images[selectedIndex]}
            alt={alternative}
          />
          <button className="nav-btn next-btn" onClick={goToNext}><FontAwesomeIcon icon={faChevronRight}/></button>
        </div>

        <div className="thumbnail-row">
          {images.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={alternative}
              className={`thumbnail-img ${index === selectedIndex ? "active" : ""}`}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
