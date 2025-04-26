import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WeatherWidget from "../Weather/WeatherWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../axios/axiosClient";
import { ApartmentType } from "../../types/types";

const Navbar: React.FC = () => {
    const [closeMenu, setCloseMenu] = useState<boolean>(true);
    const [closeBurger, setCloseBurger] = useState<boolean>(true);
    const [isOverlapping, setIsOverlapping] = useState<boolean>(false);
    const [apartments, setApartments] = useState<ApartmentType[]>([]);
    const { apartment } = useParams<string>();
    const timeoutMenu = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const logoRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    const activeApartment = apartments.filter(a => a.name === apartment);
    const otherApartments = apartments.filter(a => a.name !== apartment);
    
    useEffect(() => {
        handleMenuAnimation();
        fetchAparments();
    }, [closeMenu, apartment]);

    const handleMenu = () => {
        if (timeoutMenu.current) {
            clearTimeout(timeoutMenu.current);
        }
    
        setCloseMenu(prev => {
            const newState = !prev;
    
            if (!newState) {
                timeoutMenu.current = setTimeout(() => {
                    setCloseMenu(true);
                }, 5000);
            }
    
            return newState;
        });
    };

    const handleBurger = () =>{
        setCloseBurger(!closeBurger)
    }
    

    const handleMenuAnimation = () =>{
        if (logoRef.current && itemsRef.current) {
            const logoRect = logoRef.current.getBoundingClientRect();
            const itemsRect = itemsRef.current.getBoundingClientRect();
            setIsOverlapping(logoRect.right >= itemsRect.left);
        }
    }

    const fetchAparments = async() => {
        try {
            const response = await axiosClient.get('apartments-summary');

            if(response.status === 200){
                setApartments(response.data.apartments_summary);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="navbar">
            <div className="navbar-back">
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} className="back-button"/>
                <div className="navbar-logo-wrapper" ref={logoRef}>
                    <div className="navbar-logo">
                        {activeApartment && (<img src={`${activeApartment[0]?.logo}`} alt="" className="navbar-logo-00" onClick={handleMenu}/>)}
                        {otherApartments?.map((apartment: ApartmentType, index: number)=>(
                            <img key={index} 
                                src={apartment.logo} 
                                className={closeMenu ? `navbar-logo-${index}` : "navbar-logo-open"} 
                                onClick={() => (navigate(`/${apartment?.name}`), setCloseMenu(true))}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="navbar-burger">
                <FontAwesomeIcon icon={closeBurger ? faBars : faBarsStaggered} onClick={handleBurger}/>
            </div>

            <div className={closeBurger ? 'burger-backdrop-closed' : 'burger-backdrop'}>
                <div className="burger-menu">
                    <Link to={''} onClick={() => setCloseBurger(true)}>Home</Link>
                    <Link to={'rooms'} onClick={() => setCloseBurger(true)}>Rooms</Link>
                    <Link to={''} onClick={() => setCloseBurger(true)}>Explore Ohrid</Link>
                    <Link to={'about'} onClick={() => setCloseBurger(true)}>About</Link>
                </div>
                <div className="burger-apartments">
                    {apartments.map((apartment:ApartmentType, index: number)=>(
                        <Link key={index} to={`/${apartment?.name}`} onClick={()=>setCloseBurger(true)}>{apartment.name}</Link>
                    ))}
                </div>
            </div>

            <div
                className={`navbar-items ${isOverlapping ? "navbar-items-shift" : ""}`}
                ref={itemsRef}
            >
                <Link to={''}>Home</Link>
                <Link to={'rooms'}>Rooms</Link>
                <Link to={''}>Explore Ohrid</Link>
                <Link to={'about'}>About</Link>
            </div>

            <div className="navbar-weather">
                <WeatherWidget />
            </div>
        </div>
    );
};

export default Navbar;
