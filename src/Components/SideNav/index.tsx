import './style.scss'
import Logo from '../../Assets/image/logo.png'
import { Link,  useNavigate } from 'react-router-dom';
import RickImage from '../../Assets/image/rick-nav.png';

const SideNav = () => {
  const navigate = useNavigate(); 

  return (
    <div className="side-nav">
      <Link to='/' className='logo-container'>
        <img src={Logo}/>
      </Link>
    
        <div className='navLinks' >
          <Link to='/contact' className="link"><img src={RickImage}/><h3>Contact</h3></Link>
        </div>
     
    </div>
  );
};

export default SideNav;
