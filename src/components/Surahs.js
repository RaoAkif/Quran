import { Link } from 'react-router-dom';
import { surahData } from '../surahData';
import "../App.css"

const Surahs = () => {
  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <h1>قرآن مجید کی سورتیں</h1>
      <div>
        {Object.entries(surahData).map(([id, { name }]) => (
          <li style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}} key={id}>
            <Link to={`/Surah/${id}`}>
              <button
              style={{ color: 'black', fontSize: '200%', borderRadius: '12px', margin:'20px', fontFamily:"Jameel Noori Nastaleeq" }}
              >{name} </button>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
