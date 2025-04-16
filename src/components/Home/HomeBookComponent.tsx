import React, { useState } from "react";
import Slideshow from "../Slideshow/Slideshow/Slideshow";
import {apartments} from "../../data/apartments.json";
import Reserve from "../Reserve/Reserve";

const HomeBookComponent: React.FC = () => {
    const [apartmentImages, setApartment] = useState(apartments[0].images)
    const [showReservationModal, setShowReservationModal] = useState(false);

    return(
        <div className="book-component">
            <Slideshow images={apartmentImages} />
            <div className="overlay-center">
                <button onClick={()=>setShowReservationModal(true)} className="book-now">Book Now</button>
            </div>
            {showReservationModal && (
                <Reserve onClose={() => setShowReservationModal(false)}/>
            )}
        </div>


    )
}
export default HomeBookComponent;