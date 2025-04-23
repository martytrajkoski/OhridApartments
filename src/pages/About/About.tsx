import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axiosClient";
import { useParams } from "react-router-dom";
import { ApartmentType } from "../../types/types";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const About: React.FC = () => {
    const [apartmentData, setApartmentData] = useState<ApartmentType>();
    const { apartment } = useParams<string>();

    useEffect(() => {
        fetchApartment();
    }, [])

    const fetchApartment = async () => {
        try {
            const response = await axiosClient.post('apartment', {
                name: apartment
            })

            if (response.status === 200) {
                setApartmentData(response.data.apartment);
                console.log('apartment', apartmentData)
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="about">
            <div className="about-content">
                <h1>{apartmentData?.name}</h1>
                <div>
                    {parser(apartmentData?.description ?? "")}
                </div>
                <div>
                    <p>Check In: {apartmentData?.check_in.slice(0, 5)}</p>
                    <p>Check Out: {apartmentData?.check_out.slice(0, 5)}</p>
                </div>
                <div className="facilities">
                    {apartmentData?.top_facilities.map((item, index) => (
                        <div className="top-facility-card" key={index}>{item.name}</div>
                    ))}
                </div>
            </div>
            <div className="map">
                <Map lat={apartmentData?.location.latitude!} lng={apartmentData?.location.longitude!} zoom={15} />
                <div className="contact">
                    <div><FontAwesomeIcon icon={faEnvelope}/>: {apartmentData?.email}</div>
                    <div><FontAwesomeIcon icon={faPhone}/>: {apartmentData?.phone_number}</div>
                </div>
            </div>
        </div>
    )
}
export default About;