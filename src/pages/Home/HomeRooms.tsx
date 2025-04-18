import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import axiosClient from "../../axios/axiosClient";
import { RoomType } from "../../types/types";
import { useParams } from "react-router-dom";

const HomeRooms: React.FC = () => {
    const {apartment} = useParams<{apartment:string}>();
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(()=>{
        fetchRooms();
    },[apartment])

    const fetchRooms = async() => {
        try {
            const response = await axiosClient.post('/rooms', {
                apartment_name: apartment
            });

            if(response.status===200){
                setRooms(response.data.rooms);
                console.log('response.data.rooms', response.data.rooms)
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <div className="home-rooms">
            {rooms.map((room:RoomType, index:number)=>(
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default HomeRooms;