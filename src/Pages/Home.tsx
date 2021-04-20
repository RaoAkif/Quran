import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <h1 style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq", fontSize: '400%'}}>قرآن مجید</h1>
      <button>
      <Link style={{fontFamily:"Jameel Noori Nastaleeq", fontSize: '200%', textDecorationLine:'none'}} to="Surahs">تلاوتِ قرآن مجید کے لیے یہاں کلک کریں</Link>
      </button>
    </div>
  );
};

export default Home;
