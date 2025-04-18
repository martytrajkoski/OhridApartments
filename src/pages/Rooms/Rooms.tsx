import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import axiosClient from "../../axios/axiosClient";
import { RoomType } from "../../types/types";
import { useParams } from "react-router-dom";

const Rooms: React.FC = () =>{
    const {apartment} = useParams<{apartment:string}>();
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(()=>{
        fetchRooms()
    }, [])

    const fetchRooms = async() =>{
        try {
            const response = await axiosClient.post('/rooms', {
                apartment_name: apartment
            })

            if(response.status === 200){
                setRooms(response.data.rooms);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            {rooms.map((room:any, index:number) => (
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default Rooms;