import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apartments } from "../../data/apartments.json";

const Onboarding: React.FC = () => {
    const [zoomIndex, setZoomIndex] = useState<number | null>(null);
    const [hoverBg, setHoverBg] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCardClick = (index: number, route: string) => {
        setZoomIndex(index);
        setTimeout(() => {
            navigate(route);
        }, 600); 
    };

    return (
        <div 
            className="onboarding"
            style={{
                backgroundImage: `url(${hoverBg || "/src/assets/ohrid.jpg"})`,
                transition: '300ms'
            }}
        >
            <div className="onboarding-container">
                {apartments.map((apartment: any, index: number) => (
                    <div
                        key={index}
                        className={`onboarding-card ${
                        zoomIndex === index
                            ? "zoomed"
                            : zoomIndex !== null
                            ? "faded"
                            : ""
                        }`}
                        onClick={() => handleCardClick(index, `/${apartment.name}`)}
                        onMouseEnter={() => setHoverBg(apartment.images[0])}
                        onMouseLeave={() => setHoverBg(null)}
                    >
                        <img src={apartment.logo} alt="Logo" />
                    </div>
                ))}
            </div>
            <Link to="/" className="onboarding-bottom-card">
                Explore Ohrid
            </Link>
        </div>
    );
};

export default Onboarding;
