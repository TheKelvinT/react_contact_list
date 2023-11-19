import './style.scss'
import Logo from '../../Assets/image/logo.png'
import { navLinks } from '../../Utils/global';
import { Link,  useNavigate } from 'react-router-dom';
const SideNav = () => {
  const navigate = useNavigate(); 
  const handleLinkClick = () => {

  }

  return (
    
    <div className="side-nav">
      <Link to='/' className='logo-container'><img src={Logo}/></Link>
      {navLinks.map((link) => (
       <div key={link.id} className='navLinks' >
         <Link to={link.path}><h3>{link.text}</h3></Link>
       </div>
      ))}
    </div>
  );
};

export default SideNav;
