import React, { useState } from "react";

type Props = {
  images: string[];
  onClose: () => void;
  initialIndex: number;
};

const Modal: React.FC<Props> = ({ images, onClose, initialIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-main-image">
          <img src={`${images[selectedIndex]}`} alt={`selected-${selectedIndex}`} />
        </div>

        <div className="thumbnail-row">
          {images.map((item, index) => (
            <img
              key={index}
              src={`${item}`}
              alt={`thumb-${index}`}
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
