import { Link } from 'react-router-dom';
import './Home.css';
import splash from '../images/splash.png';

export const Home = () => {
  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <div style={{borderRadius: '12px', margin: '0px', padding: '0px', border: '0px'}}>
      <Link style={{fontFamily:"Jameel Noori Nastaleeq", fontSize: '200%', textDecorationLine:'none', position: 'absolute', top: '56.5%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }} to="Surahs">
      <img style={{width: '100vw', position: 'relative', textAlign: 'center'}} src={splash} alt="splash" />
      </Link>
      </div>
    </div>
  );
};

export default Home;
