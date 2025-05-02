import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axiosClient";
import { useParams } from "react-router-dom";
import { ApartmentType } from "../../types/types";
import parser from "html-react-parser";
import Map from "../../components/Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";

const About: React.FC = () => {
    const [apartmentData, setApartmentData] = useState<ApartmentType>();
    const { apartment } = useParams<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchApartment();
    }, [])

    const fetchApartment = async () => {
        setLoading(true);

        try {
            const response = await axiosClient.post('apartment', {
                name: apartment
            })

            if (response.status === 200) {
                setApartmentData(response.data.apartment);
            }
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading && <Loading/>}
            <div className="about">
                <div className="about-content">
                    <h1>{apartmentData?.name}</h1>
                    <div>
                        {parser(apartmentData?.description ?? "")}
                    </div>
                    <div>
                    {apartmentData?.check_in && (
                        <p>Check In: From {JSON.parse(apartmentData.check_in)[0]} to {JSON.parse(apartmentData.check_in)[1]}</p>
                    )}
                    {apartmentData?.check_out && (
                        <p>Check Out: From {JSON.parse(apartmentData.check_out)[0]} to {JSON.parse(apartmentData.check_out)[1]}</p>
                    )}
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
                        {apartmentData?.email && <div><FontAwesomeIcon icon={faEnvelope}/>: {apartmentData?.email}</div>}
                        {apartmentData?.phone_number && <div><FontAwesomeIcon icon={faPhone}/>: {apartmentData?.phone_number.map((number, index) => (<span key={index}>{number} </span>))} </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default About;