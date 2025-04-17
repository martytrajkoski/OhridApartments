import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RoomType } from "../../types/types";

const RoomCard: React.FC<{room: RoomType}> = ({room}) => {
    const { apartment } = useParams();    

    return(
        <Link to={`/${apartment}/${room?.name}`} className="room-card">
            <div className="room-info">
                <h1>{room.name}</h1>
                <p>{room.description}</p>
            </div>
            <img src={room.images[0]} /> 
        </Link>
    )
}

export default RoomCard;