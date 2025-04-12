import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import {rooms} from "../../data/rooms.json";
import {locations} from "../../data/locations.json";
import {apartments} from "../../data/apartments.json";
import {facilities} from "../../data/facilities.json";
import Gallery from "../../components/Slideshow/Gallery/Gallery";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import Reserve from "../../components/Reserve/Reserve";

const Room: React.FC = () => {
    const [apartment, setApartment] = useState<any>(apartments[0]);
    const [location, setLocation] = useState<any>(locations[0]);
    const [room, setRoom] = useState<any>(rooms[0]);
    const [allFacilities, setFacility] = useState<any>(facilities[0].rooms[0].all_facilities);
    const [topFacilities, setTopFacility] = useState<any>(facilities[0].top_facilities);
    const [showReservationModal, setShowReservationModal] = useState(false);

    return(
        <div className="room">
            <div className="room-info">
                <div className="room-info-details">
                    <h1>{room.name}</h1>
                    <small><FontAwesomeIcon icon={faLocationDot}/>{location.address} - <a href="https://maps.app.goo.gl/9mxV8yQ6tRiSBZw98">Excellent location - show map</a></small>
                </div>
                <div className="room-info-button">
                    <div className="rating"><FontAwesomeIcon icon={faStar}/>  {apartment.rating}</div>
                    <div className="reserve" onClick={()=>setShowReservationModal(true)}>Reserve</div>
                </div>
            </div>
            <div className="room-display">
                <div className="room-display-gallery">
                    <Gallery images={room.images}/>
                </div>
                <div className="room-display-map">
                    <Map lat={location.lat} lng={location.lng} zoom={15}/>
                </div>
            </div>
            <div className="room-description">
                <div className="room-description-container">
                    <div className="top-facilities">
                        {topFacilities.map((facility:any, index:number)=>(
                            <div className="top-facility-card" key={index}>{facility}</div>
                        ))}
                    </div>
                    <div className="room-description-text">
                        {parser(apartment.description)}
                    </div>
                    <div>
                        <div className="all-facilities">
                            <b>Views:</b>
                            {room.view.map((item:any, index:number) => (
                                <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                            ))}
                        </div>
                        <div className="all-facilities">
                            <b>Bathroom:</b>
                            {room.bathroom.map((item:any, index:number) => (
                                <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="room-description-sidebar">
                    <div className="all-facilities">
                        {allFacilities.map((facility:any, index:number) => (
                            <div key={index}><FontAwesomeIcon icon={faCheck}/> {facility}</div>
                        ))}
                    </div>

                    <Link to={'/'}>Reserve</Link>
                </div>
            </div>
            {showReservationModal && (
                <Reserve onClose={() => setShowReservationModal(false)}/>
            )}
        </div>
    )
}
export default Room;