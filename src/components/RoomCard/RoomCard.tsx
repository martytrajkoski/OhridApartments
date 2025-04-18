import React from "react";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RoomType } from "../../types/types";

const RoomCard: React.FC<{room: RoomType}> = ({room}) => {
    const { apartment } = useParams();    

    return(
        <Link to={`/${apartment}/${room?.name}`} className="room-card">
            <div className="room-info">
                <h1>{room.name}</h1>
                {parser(room?.description ?? "")}
            </div>
            <img src={room.images[0]} /> 
        </Link>
    )
}

export default RoomCard;