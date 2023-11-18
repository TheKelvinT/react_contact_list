import { Outlet } from "react-router-dom";
import { validateRegister } from "../../Validation"
import SideNav from "../../Components/SideNav";
import '../../Styles/layout.scss'
import { useState } from "react";

const Home = () => {
  
  return (
    <div className="main-container">
    
     <SideNav />
    <div className="content-container" >
      <Outlet/>
      </div>
    
    </div>
  )
  
}

export default Home