import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";
import { ApartmentType } from "../../types/types";
import backgroundImg from "../../../public/backgrounds/ohrid.jpg"
import { Helmet } from 'react-helmet-async';

const Onboarding: React.FC = () => {
    const [zoomIndex, setZoomIndex] = useState<number | null>(null);
    const [hoverBg, setHoverBg] = useState<string | null>(null);
    const [apartments, setApartments] = useState<ApartmentType[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchAparments();
    },[])

    const fetchAparments = async() => {
        try {
            const response = await axiosClient.get('/apartments-summary');
            setApartments(response.data.apartments_summary);

        } catch (error) {
            console.error(error);
        }
    }

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
                backgroundImage: `url(${hoverBg || backgroundImg})`,
                transition: '300ms'
            }}
        >
            <Helmet>
            <title>Ohrid Apartments</title>
            <meta name="description" content="Book top-rated apartments in Ohrid near the lake and the Old Town. Discover White Lake, Boulevard Apartments, and Casa Norvegia Apartments." />
            <link rel="canonical" href="https://theohridapartments.com/" />
            </Helmet>
            <div className="overlay-center"></div>
            <div className="onboarding-container">
                {apartments?.map((apartment: any, index: number) => (
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
                        <img src={apartment.logo} alt="Logo"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Onboarding;
