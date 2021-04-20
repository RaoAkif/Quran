import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="body-container">
      <h1>Welcome to Quran Majeed</h1>
      <Link to="Surahs">Watch Quran Majeed with Urdu Translation</Link>
    </div>
  );
};

export default Home;
