import React, { useEffect, useState } from "react";
import Slideshow from "../Slideshow/Slideshow/Slideshow";
import Reserve from "../Reserve/Reserve";
import axiosClient from "../../axios/axiosClient";
import { useParams } from "react-router-dom";
import { ApartmentType } from "../../types/types";

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
            <Slideshow images={apartmentImages ?? []} />
            <div className="overlay-center">
                <span>{ apartment }</span>
                <button onClick={()=>setShowReservationModal(true)} className="book-now">Book Now</button>
            </div>
            {showReservationModal && (
                <Reserve onClose={() => setShowReservationModal(false)}/>
            )}
        </div>


    )
}
export default HomeBookComponent;