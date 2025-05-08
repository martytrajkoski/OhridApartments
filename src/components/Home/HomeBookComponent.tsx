import React, { useEffect, useState } from "react";
import Slideshow from "../Slideshow/Slideshow/Slideshow";
import Reserve from "../Reserve/Reserve";
import axiosClient from "../../axios/axiosClient";
import { useParams } from "react-router-dom";
import { ApartmentType } from "../../types/types";
import { Helmet } from "react-helmet";

const HomeBookComponent: React.FC = () => {
    const [apartmentImages, setApartmentImages] = useState<ApartmentType[]>([])
    const [showReservationModal, setShowReservationModal] = useState<boolean>(false);
    const { apartment } = useParams<{apartment:string}>();

    useEffect(()=>{
        fetchAparment()
    },[apartment])

    const fetchAparment = async() =>{
        try {
            const response = await axiosClient.post('apartment',{
                name: apartment,
            });

            if(response.status === 200){
                setApartmentImages(response.data.apartment.images || [])
            }
                
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="book-component">
            <Helmet>
                <meta name="description" content={`${apartment} Ohrid Apartments`} />
                <meta name="keywords" content={`${apartment} Ohrid Apartments`} />
                <meta property="og:title" content={`${apartment} Ohrid Apartments`} />
                <meta property="og:description" content={`${apartment} Ohrid Apartments`} />
            </Helmet>
            <Slideshow images={apartmentImages ?? []} />
            <div className="overlay-center">
                <h1>{ apartment }</h1>
                <button onClick={()=>setShowReservationModal(true)} className="book-now">Book Now</button>
            </div>
            {showReservationModal && (
                <Reserve onClose={() => setShowReservationModal(false)}/>
            )}
        </div>


    )
}
export default HomeBookComponent;