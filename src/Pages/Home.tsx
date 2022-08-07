import { Link } from 'react-router-dom';
import './Home.css';
// import header from '../images/header.svg';

export const Home = () => {
  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <h1 style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq", fontSize: '400%'}}>قرآن مجید</h1>
      {/* <img src={header} alt="header" /> */}
      <button style={{borderRadius: '12px'}}>
      <Link style={{fontFamily:"Jameel Noori Nastaleeq", fontSize: '200%', textDecorationLine:'none'}} to="Surahs">تلاوت کے لیے یہاں کلک کریں</Link>
      </button>
    </div>
  );
};

export default Home;
