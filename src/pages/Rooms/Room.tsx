import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCheck, faLocationDot, faParking, faStar } from "@fortawesome/free-solid-svg-icons";
import Gallery from "../../components/Slideshow/Gallery/Gallery";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import Reserve from "../../components/Reserve/Reserve";
import axiosClient from "../../axios/axiosClient";
import { FacilityType, RoomType } from "../../types/types";
import Loading from "../../components/Loading/Loading";

const Room: React.FC = () => {
    const [roomData, setRoom] = useState<RoomType>();
    const [showReservationModal, setShowReservationModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { room } = useParams<{ room:string }>();

    useEffect(()=>{
        fetchRoom();
    }, []);

    const fetchRoom = async() => {
        setLoading(true);

        try {
            const response = await axiosClient.post('/room',{
                name: room
            });

            if(response.status === 200){
                setRoom(response.data.room);
            }
                
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(true);
        }
    }

    return(
        
        <div className="room">
            {!loading && <Loading/>}
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
                    <div className="facility">
                        {roomData?.bed && (
                            <div className="all-facilities">
                                {roomData.bed.map((item, index) => (
                                    <div key={index}><FontAwesomeIcon icon={faBed}/> {item}</div>
                                ))}
                            </div>
                        )}
                        {roomData?.room_size && (
                            <div><b>Room Size: </b>{roomData.room_size} m<sup>2</sup></div>
                        )} 
                        {roomData?.parking && (
                            <div><FontAwesomeIcon icon={faParking}/> {roomData.parking}</div>
                        )} 
                    </div>
                    <div className="facilities">
                        {roomData?.view && (
                            <div>
                                <b>Views:</b>
                                <div className="all-facilities">
                                    {roomData?.view && roomData?.view.map((item:any, index:number) => (
                                        <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                                    ))}
                                </div>

                            </div>
                        )}
                        {roomData?.bathroom && (
                            <div>
                                <b>Bathroom:</b>
                                <div className="all-facilities">
                                    {roomData?.bathroom.map((item:any, index:number) => (
                                        <div key={index}><FontAwesomeIcon icon={faCheck}/> {item}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="room-description-sidebar">
                    <div className="all-facilities">
                        {roomData?.all_facilities.map((facility:FacilityType, index:number) => (
                            <div key={index}><FontAwesomeIcon icon={faCheck}/> {facility.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            {showReservationModal && (
                <Reserve onClose={() => setShowReservationModal(false)}/>
            )}
        </div>
    )
}

export default Room;