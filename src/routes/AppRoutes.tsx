import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "../pages/Onboaring/Onboarding";
import Apartment from "../pages/Apartment/Apartment";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import Room from "../pages/Rooms/Room";
import About from "../pages/About/About";

const AppRoutes: React.FC = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Onboarding/>} />
                <Route path="/:apartment" element={<Apartment/>}>
                    <Route index element={<Home/>} />
                    <Route path="rooms" element={<Rooms/>}/>
                    <Route path=":room" element={<Room/>}/>
                    <Route path="about" element={<About/>}/>
                </Route>
            </Routes>
        </Router>
    )
} 
export default AppRoutes;