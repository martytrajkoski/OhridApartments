import React, { useEffect, useState } from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import axiosClient from "../../axios/axiosClient";
import { RoomType } from "../../types/types";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Loading from "../../components/Loading/Loading";

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
                <title>Ohrid Apartments | Your Home Away From Home</title>
                <meta name="description" content="Discover beautiful and affordable apartments in Ohrid. Book now for your perfect getaway!" />
                <meta name="keywords" content="Ohrid, apartments, vacation, travel, booking" />
                <meta property="og:title" content="Ohrid Apartments" />
                <meta property="og:description" content="Find your perfect stay in Ohrid with our curated apartment listings." />
                <meta property="og:image" content="/logo.jpg" />
                <meta property="og:url" content="https://theohridapartments.com" />
            </Helmet>
            {loading && <Loading/>}
            {rooms.map((room:RoomType, index:number)=>(
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default HomeRooms;