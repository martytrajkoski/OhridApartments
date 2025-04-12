import React from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import {rooms} from "../../data/rooms.json";

const Rooms: React.FC = () =>{
    return(
        <div>
            {rooms.map((room:any, index:number) => (
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default Rooms;