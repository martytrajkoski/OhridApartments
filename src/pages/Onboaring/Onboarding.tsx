import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";
import { ApartmentType } from "../../types/types";
import { Helmet } from 'react-helmet-async';
import backgroundImg from "../../../public/backgrounds/ohrid.jpg"

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
                <title>Ohrid Apartments | Your Home Away From Home</title>
                <meta name="description" content="Discover beautiful and affordable apartments in Ohrid. Book now for your perfect getaway!" />
                <meta name="keywords" content="Ohrid, apartments, vacation, travel, booking" />
                <meta property="og:title" content="Ohrid Apartments" />
                <meta property="og:description" content="Find your perfect stay in Ohrid with our curated apartment listings." />
                <meta property="og:image" content="/logo.jpg" />
                <meta property="og:url" content="https://theohridapartments.com" />
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
