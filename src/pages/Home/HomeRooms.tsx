import React from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import {rooms} from "../../data/rooms.json";

const HomeRooms: React.FC = () => {
    return(
        <div className="home-rooms">
            {rooms.map((room:any, index:number)=>(
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default HomeRooms;