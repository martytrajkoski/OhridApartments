import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import axiosClient from "../../axios/axiosClient";
import { RoomType } from "../../types/types";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

const HomeRooms: React.FC = () => {
    const {apartment} = useParams<{apartment:string}>();
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        fetchRooms();
    },[apartment])

    const fetchRooms = async() => {
        setLoading(true);

        try {
            const response = await axiosClient.post('/rooms', {
                apartment_name: apartment
            });

            if(response.status===200){
                setRooms(response.data.rooms);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    
    return(
        <div className="home-rooms">
            <Helmet>
                <meta name="description" content={`${apartment} Ohrid Apartments`} />
                <meta name="keywords" content={`${apartment} Ohrid Apartments`} />
                <meta property="og:title" content={`${apartment} Ohrid Apartments`} />
                <meta property="og:description" content={`${apartment} Ohrid Apartments`} />
            </Helmet>
            {loading && <Loading/>}
            {rooms.map((room:RoomType, index:number)=>(
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default HomeRooms;