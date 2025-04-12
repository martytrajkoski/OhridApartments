import React from "react";

import HomeBookComponent from "../../components/Home/HomeBookComponent";
import HomeRooms from "./HomeRooms";

const Home: React.FC = () => {
    return(
        <div className="homepage">
            <HomeBookComponent/>
            <HomeRooms/>
        </div>
    );
}
export default Home;