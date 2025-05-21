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
                <meta name="description" content="Enjoy your vacation with Ohrid Apartments, modern and comfortable rentals near the beautiful Lake Ohrid. Book your perfect stay today!" />
                <meta name="keywords" content="Ohrid apartments, lake view apartments Ohrid, White Lake apartment, Boulevard Ohrid, Casa Norvegia Ohrid, Ohrid accommodation, Ohrid rentals, vacation rentals Ohrid, apartments near Old Town Ohrid, Ohrid lakefront, holiday homes Ohrid, Ohrid stay, cheap apartments Ohrid, luxury apartments Ohrid, family friendly Ohrid apartments, apartment with balcony Ohrid, apartment with parking Ohrid, Ohrid lodging, Ohrid booking, North Macedonia travel, travel Ohrid, Ohrid rooms, places to stay in Ohrid, Ohrid hotels, guesthouse Ohrid, apartment by lake Ohrid, The ohrid apartments, white lake, Boulevard, Casa Norvegia, Vili Ohrid, Apartmani Ohrid" />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content="Ohrid Apartments | Your Home Away From Home" />
                <meta property="og:description" content="Modern and cozy apartments near Lake Ohrid with stunning views and all amenities. Discover your perfect getaway." />
                <meta property="og:image" content="https://www.theohridapartments.com/logo.png" />
                <meta property="og:url" content="https://www.theohridapartments.com" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ohrid Apartments | Your Home Away From Home" />
                <meta name="twitter:description" content="Enjoy a relaxing stay at Ohrid Apartments near Lake Ohrid. Affordable, clean, and ideal for families and solo travelers." />
                <meta name="twitter:image" content="https://www.theohridapartments.com/logo.png" />

                <link rel="canonical" href="https://www.theohridapartments.com" />
            </Helmet>
            {loading && <Loading/>}
            {rooms.map((room:RoomType, index:number)=>(
                <RoomCard room={room} key={index}/>
            ))}
        </div>
    )
}
export default HomeRooms;