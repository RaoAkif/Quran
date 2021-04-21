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
              <div style={{width: '50%', margin: 'auto'}}>
              <button
              style={{width:"120px", color: 'black', fontSize: '140%', borderRadius: '12px', margin:'20px', fontFamily:"Jameel Noori Nastaleeq" }}
              >
                {name} 
                </button>
              <button style={{ width:"40px", margin:'0px', color:'white', backgroundColor:'#8B4513', textDecorationLine:'none'}}>{id}</button>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
