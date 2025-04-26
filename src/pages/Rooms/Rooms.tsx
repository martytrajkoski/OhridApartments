import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import axiosClient from "../../axios/axiosClient";
import { RoomType } from "../../types/types";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Rooms: React.FC = () =>{
    const {apartment} = useParams<{apartment:string}>();
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(()=>{
        fetchRooms()
    }, [])

    const fetchRooms = async() =>{
        setLoading(true);

        try {
            const response = await axiosClient.post('/rooms', {
                apartment_name: apartment
            })

            if(response.status === 200){
                setRooms(response.data.rooms);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            {loading && <Loading/>}
            {rooms.map((room:any, index:number) => (
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default Rooms;