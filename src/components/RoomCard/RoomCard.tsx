import React from "react";
import img from "../../assets/boulevard.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const RoomCard: React.FC<{room: any}> = ({room}) => {
    const { apartment } = useParams();    

    return(
        <Link to={`/${apartment}/${room.id}`} className="room-card">
            <div className="room-info">
                <h1>{room.name}</h1>
                <p>{room.description}</p>
            </div>
            <img src={img} /> 
            {/* mozit pokje sliki edna do druga, nad druga bilo kako od taa soba */}
        </Link>
    )
}

export default RoomCard;