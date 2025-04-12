import React from "react";
import { Link } from "react-router-dom";
import {apartments} from "../../data/apartments.json";

const Onboarding: React.FC = () =>{
    return(
        <div className="onboarding">
            <div className="onboarding-container">
                {apartments.map((apartment:any, index:number) => (
                    <Link to={`/${apartment.name}`} className="onboarding-card" key={index}>
                        <img src={apartment.logo} alt="Logo" />
                    </Link>

                ))}
            </div>
            <Link to={"/"} className="onboarding-bottom-card">
                Explore Ohrid
            </Link>
        </div>
    )
}
export default Onboarding;