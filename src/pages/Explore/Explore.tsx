import React from "react";
import ExploreCard from "../../components/ExploreCard/ExploreCard";
import { Link } from "react-router-dom";

const Explore: React.FC = () => {
    return(
        <div className="explore">
            {/* <div className="explore-title">
            </div> */}
            <div className="explore-cards">
                <ExploreCard></ExploreCard>
                <ExploreCard></ExploreCard>
            </div>
           {/* <ExploreCard></ExploreCard>
           <ExploreCard></ExploreCard>
           <ExploreCard></ExploreCard> */}
            <Link to="explore" className="explore-bottom-card">
                Accommodations in Ohrid
            </Link>
        </div>
    )
}

export default Explore;