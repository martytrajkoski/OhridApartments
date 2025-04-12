import React, { useState } from "react";
import { Link } from "react-router-dom";
import {apartments} from "../../data/apartments.json";
import WeatherWidget from "../Weather/WeatherWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    const [closeMenu, setCloseMenu] = useState<boolean>(true)

    const handleMenu = () =>{
        setCloseMenu(!closeMenu);
    }

    return(
        <div className="navbar">
            <div className="navbar-back">
                <Link to={'/'}><FontAwesomeIcon icon={faArrowLeft}/></Link>
                <div className="navbar-logo">
                    <img src={apartments[0].logo} className="navbar-logo-1" onClick={handleMenu}/>
                    <img src={apartments[0].logo} className={closeMenu ? ("navbar-logo-2 "):("navbar-logo-open") }/>
                    <img src={apartments[0].logo} className={closeMenu ? ("navbar-logo-3 "):("navbar-logo-open") }/>
                </div>
            </div>
            <div className="navbar-items">
                <Link to={'rooms'}>Rooms</Link>
                <Link to={'contact'}>Contact</Link>
                <Link to={'about'}>About</Link>
                <Link to={''}>Explore Ohrid</Link>
            </div>
            <div className="navbar-weather">
                <WeatherWidget />
            </div>
        </div>
    );
}
export default Navbar;