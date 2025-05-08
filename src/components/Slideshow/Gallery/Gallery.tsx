import React, { useState } from "react";
import Modal from "./Modal";

type Props = {
  images: string[];
  alternative: string;
};

const Gallery: React.FC<Props> = ({ images = [], alternative }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const visibleImages = images.slice(0, 7);
  const remainingCount = images.length - 7;

  return (
    <>
      <div className="gallery-grid">
        {visibleImages.map((item: string, index) => (
          <div
            key={index}
            className={`gallery-item ${index === 0 || index === 1 ? "large" : ""}`}
            onClick={() => {handleClick(index); setShowModal(true)}}
          >
            <img src={`${item}`} alt={alternative} />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="gallery-item more" onClick={() => handleClick(7)}>
            <div className="overlay">+{remainingCount} photos</div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          images={images}
          onClose={() => setShowModal(false)}
          initialIndex={selectedIndex}
          alternative={alternative}
        />
      )}
    </>
  );
};

export default Gallery;
