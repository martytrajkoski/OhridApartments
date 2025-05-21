import React from "react";
import { Helmet } from 'react-helmet-async';
import HomeBookComponent from "../../components/Home/HomeBookComponent";
import HomeRooms from "./HomeRooms";


const Home: React.FC = () => {
    return(
        <div className="homepage">
            <Helmet>
                <title>Ohrid Apartments | Your Home Away From Home</title>
                <meta name="description" content="Discover beautiful and affordable apartments in Ohrid. Book now for your perfect getaway!" />
                <meta name="keywords" content="Ohrid, apartments, vacation, travel, booking" />
                <meta property="og:title" content="Ohrid Apartments" />
                <meta property="og:description" content="Find your perfect stay in Ohrid with our curated apartment listings." />
                <meta property="og:image" content="/logo.jpg" />
                <meta property="og:url" content="https://theohridapartments.com" />
            </Helmet>
            <HomeBookComponent/>
            <HomeRooms/>
        </div>
    );
}
export default Home;