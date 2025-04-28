import { faEnvelope, faGlobe, faLocationDot, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import img from "../../assets/boulevard.png";

const ExploreCard: React.FC = () => {
    return(
        <div className="explore-card">
            <div className="card-info">
                <div className="card-info-title">
                    <h1>Paragliding Ohrid</h1>
                    <small>Location</small>
                </div>
                <div className="card-info-phone">
                    <FontAwesomeIcon icon={faPhoneVolume}/>
                    <div>
                        <p>Call us for booking</p>
                        <p>+389722222222</p>
                    </div>
                </div>
                <div className="card-info-online">
                    <div className="svgs">
                        <FontAwesomeIcon icon={faGlobe} />
                        <FontAwesomeIcon icon={faEnvelope} />
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="text">
                        <p>website</p>
                        <p>email</p>
                        <p>location</p>
                    </div>
                </div>
            </div>
            
            <div className="card-images">
                    <img src={img} alt="img" />
            </div>
        </div>
    )
}

export default ExploreCard;