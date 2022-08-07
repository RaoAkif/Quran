import { Link } from 'react-router-dom';
import { surahData } from '../surahData';
import "../App.css"
import "./SurahShowcase.css"
import header from '../images/header.PNG';

const Surahs = () => {
  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <img style={{width: "100vw"}} src={header} alt="header" />
      <div>
        {Object.entries(surahData).map(([id, { name }]) => (
          <li style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}} key={id}>
            <Link to={`/Surah/${id}`} style={{ textDecoration: 'none' }}>
              <div className='surah-div'>
                <p style={{ width:"120px", textDecorationLine:'none', color: 'white', fontSize: '140%', borderRadius: '12px', margin:'20px', fontFamily:"Jameel Noori Nastaleeq", color: "#032D2B" }}>{name}</p>
                <div style={{ padding: '0px', margin:'0px', color:'#032D2B', textDecorationLine:'none' }}>{id}</div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
