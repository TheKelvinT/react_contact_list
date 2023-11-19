import {Route,Routes} from "react-router-dom"
import Home from "./Home"
import Contact from '../Components/Contact/index'
import SingleContact from '../Components/SingleContact/index'
import NotFound from "../Components/NotFound"


const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Home/>} >
        <Route path="contact" element={<Contact/>}>
          <Route path=":id" element={<SingleContact/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default Router