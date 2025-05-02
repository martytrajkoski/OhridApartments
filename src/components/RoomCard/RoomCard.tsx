import React from "react";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RoomType } from "../../types/types";

const RoomCard: React.FC<{room: RoomType}> = ({room}) => {
    const { apartment } = useParams();  
    
    const stripHtml = (html: string): string => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };
    
    const rawText = stripHtml(room?.description ?? "");
    const shortText = rawText.length > 260 ? rawText.slice(0, 260) + "..." : rawText;
    const shortHtml = `<p>${shortText}</p>`; 


    return(
        <Link to={`/${apartment}/${room?.name}`} className="room-card">
            <h1 className="room-name-m">
                {room.name}
            </h1>
            <div className="room-info-m">
                <div className="room-info-text-m">
                    {parser(shortHtml)}
                </div>
                <div className="room-img-m">
                    <img src={room.images[0]}/> 
                </div>
            </div>
            <div className="room-info">
                <h1>{room.name}</h1>
                {parser(room?.description ?? "")}
            </div>
            <img src={room.images[0]} className="room-img"/> 
        </Link>
    )
}

export default RoomCard;