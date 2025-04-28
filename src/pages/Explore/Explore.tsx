import React, { useEffect, useState } from "react";
import ExploreCard from "../../components/ExploreCard/ExploreCard";
import { Link } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";
import { ApartmentType } from "../../types/types";

const Explore: React.FC = () => {
    const [apartments, setApartments] = useState<ApartmentType[]>([]);

    const fetchAparmentNames = async() =>{
        try {
            const response = await axiosClient.get('apartments-summary');

            if(response.status === 200){
                setApartments(response.data.apartments_summary);
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchAparmentNames();
    }, [])

    return(
        <div className="explore">
            <div className="explore-cards">
                <div className="text-slide">
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                    <ExploreCard></ExploreCard>
                </div>
            </div>
            <div className="apartments-scroll">
                <div className="text-slide">
                    {apartments?.map((item, index)=>(
                        <h2 key={index}>{item.name}</h2>
                    ))}
                    {apartments?.map((item, index)=>(
                        <h2 key={index}>{item.name}</h2>
                    ))}
                    {apartments?.map((item, index)=>(
                        <h2 key={index}>{item.name}</h2>
                    ))}
                </div>
            </div>

            <Link to="" className="explore-bottom-card">
                Accommodations in Ohrid
            </Link>
        </div>
    )
}

export default Explore;