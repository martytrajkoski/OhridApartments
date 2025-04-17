import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import Gallery from "../../components/Slideshow/Gallery/Gallery";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import Reserve from "../../components/Reserve/Reserve";
import axiosClient from "../../axios/axiosClient";
import { FacilityType, RoomType } from "../../types/types";

const Room: React.FC = () => {
    const [roomData, setRoom] = useState<RoomType>();
    const [showReservationModal, setShowReservationModal] = useState(false);
    const { room } = useParams<{ room:string }>();

    useEffect(()=>{
        fetchRoom();
    }, []);

    const fetchRoom = async() => {
        try {
            const response = await axiosClient.post('/room',{
                name: room
            });

            if(response.status === 200){
                setRoom(response.data.room);
                console.log('response.data.room', response.data.room)
                console.log('room', roomData?.apartment.top_facilities)
            }
                

        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="room">
            <div className="room-info">
                <div className="room-info-details">
                    <h1>{roomData?.name}</h1>
                    <small><FontAwesomeIcon icon={faLocationDot}/>{roomData?.apartment.location.address} {roomData?.apartment.location.city} {roomData?.apartment.location.country} - <a href={roomData?.apartment.location.map_url}>Excellent location - show map</a></small>
                </div>
                <div className="room-info-button">
                    <div className="rating"><FontAwesomeIcon icon={faStar}/> {roomData?.apartment.rating}</div>
                    <div className="reserve" onClick={()=>setShowReservationModal(true)}>Reserve</div>
                </div>
            </div>
            <div className="room-display">
                <div className="room-display-gallery">
                    <Gallery images={roomData?.images ?? []}/>
                </div>
                <div className="room-display-map">
                    <Map lat={roomData?.apartment.location.latitude ?? 0} lng={roomData?.apartment.location.longitude ?? 0} zoom={15}/>
                </div>
            </div>
            <div className="room-description">
                <div className="room-description-container">
                    <div className="top-facilities">
                        {roomData?.apartment.top_facilities.map((facility:FacilityType, index:number)=>(
                            <div className="top-facility-card" key={index}>{facility.name}</div>
                        ))}
                    </div>
                    <div className="room-description-text">
                        {parser(roomData?.description ?? "")}
                    </div>
                    <div>
                        <div className="all-facilities">
                            <b>Views:</b>
                            {roomData?.view.map((item:any, index:number) => (
                                <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                            ))}
                        </div>
                        <div className="all-facilities">
                            <b>Bathroom:</b>
                            {roomData?.bathroom.map((item:any, index:number) => (
                                <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="room-description-sidebar">
                    <div className="all-facilities">
                        {roomData?.all_facilities.map((facility:FacilityType, index:number) => (
                            <div key={index}><FontAwesomeIcon icon={faCheck}/> {facility.name}</div>
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