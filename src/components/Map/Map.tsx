import React from 'react';

const Map: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}>
      <iframe
        src={mapSrc}
        style={{ width: '100%', height: '100%', border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
