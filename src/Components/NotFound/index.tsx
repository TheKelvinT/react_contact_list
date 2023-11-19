import { Outlet } from "react-router-dom";
import { validateRegister } from "../../Validation"
import SideNav from "../../Components/SideNav";
import './index.scss'
import { useState } from "react";
import SpeechBubble from "./Components/SpeechBubble";

const NotFound = () => {
  
  return (
    <div className="main-container">
      <SideNav />
      <div className="content-container" >
        <SpeechBubble/>
    
      </div>
    </div>
  )
}

export default NotFound