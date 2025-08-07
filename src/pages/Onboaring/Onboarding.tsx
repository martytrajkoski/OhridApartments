import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";
import { ApartmentType } from "../../types/types";
import { Helmet } from 'react-helmet-async';
import backgroundImg from "../../../public/backgrounds/ohrid.jpg";

const Onboarding: React.FC = () => {
    const [hoverBg, setHoverBg] = useState<string | null>(null);
    const [apartments, setApartments] = useState<ApartmentType[]>([]);
    const [showApartments, setShowApartments] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAparments();
    }, []);

    const fetchAparments = async () => {
        try {
            const response = await axiosClient.get('/apartments-summary');
            setApartments(response.data.apartments_summary);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = (route: string) => {
        navigate(route);
    };

    return (
        <div
            className="onboarding"
            style={{
                backgroundImage: `url(${hoverBg || backgroundImg})`,
                transition: '300ms',
            }}
        >
            <Helmet>
                <title>Ohrid Apartments | Your Home Away From Home</title>
                <meta name="description" content="Enjoy your vacation with Ohrid Apartments, modern and comfortable rentals near the beautiful Lake Ohrid. Book your perfect stay today!" />
                <meta name="keywords" content="Ohrid apartments, lake view apartments Ohrid, White Lake apartment, Boulevard Ohrid, Casa Norvegia Ohrid, Ohrid accommodation, Ohrid rentals, vacation rentals Ohrid, apartments near Old Town Ohrid, Ohrid lakefront, holiday homes Ohrid, Ohrid stay, cheap apartments Ohrid, luxury apartments Ohrid, family friendly Ohrid apartments, apartment with balcony Ohrid, apartment with parking Ohrid, Ohrid lodging, Ohrid booking, North Macedonia travel, travel Ohrid, Ohrid rooms, places to stay in Ohrid, Ohrid hotels, guesthouse Ohrid, apartment by lake Ohrid, The ohrid apartments, white lake, Boulevard, Casa Norvegia, Vili Ohrid, Apartmani Ohrid" />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content="Ohrid Apartments | Your Home Away From Home" />
                <meta property="og:description" content="Modern and cozy apartments near Lake Ohrid with stunning views and all amenities. Discover your perfect getaway." />
                <meta property="og:image" content="https://www.theohridapartments.com/logo.png" />
                <meta property="og:url" content="https://www.theohridapartments.com" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ohrid Apartments | Your Home Away From Home" />
                <meta name="twitter:description" content="Enjoy a relaxing stay at Ohrid Apartments near Lake Ohrid. Affordable, clean, and ideal for families and solo travelers." />
                <meta name="twitter:image" content="https://www.theohridapartments.com/logo.png" />

                <link rel="canonical" href="https://www.theohridapartments.com" />
            </Helmet>

            <div className="overlay-center"></div>
            <div className="onboarding-title">
                <h1>Ohrid Apartments</h1>
                <h3>Find your perfect stay</h3>
            </div>
            <div className="onboarding-container">
                {!showApartments && (
                    <button onClick={() => setShowApartments(true)}>Choose Your Stay</button>
                )}
                {showApartments && apartments.map((apartment, index) => (
                    <div 
                        className="card animate-drop-in" 
                        key={index} 
                        onClick={() => handleCardClick(`/${apartment.name}`)}
                        onMouseEnter={() => setHoverBg(apartment.images?.[0] || null)}
                        onMouseLeave={() => setHoverBg(null)}
                    >
                        <img src={apartment.logo} alt={`${apartment.name} Logo`} />
                        <p>{apartment.name}</p>
                    </div>
                ))}
                <div className="card">
                    <img src="" alt="iamge" />
                    <p>uiwfiurfrpferufr</p>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
