import { Outlet } from "react-router-dom";
import { validateRegister } from "../../Validation"
import SideNav from "../../Components/SideNav";
import './index.scss'
import { useState } from "react";
import SpeechBubble from "./Components/SpeechBubble";

const NotFound = () => {
  
  return (
    <div className="main-container">
         <SpeechBubble/>
      <SideNav />
   
      <div className="content-container" >
   
    
      </div>
    </div>
  )
}

export default NotFound