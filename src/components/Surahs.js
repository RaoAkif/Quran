import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../App.css"
import "./SurahShowcase.css"
import header from '../images/header.PNG';
import circleArt from '../images/number-circle.png';
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/surahs";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}


const Surahs = () => {
  const [surahData, setSurahData] = useState([]);
  
  useEffect(() => {
    getAPIData().then((items) => {
        setSurahData(items)
    })}, []);
  
  console.log(surahData)

  return (
    <div style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>
      <img style={{width: "100vw"}} src={header} alt="header" />
      <div>
        {Object.entries(surahData).map(([id, { en_name, name }]) => (
          <li style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}} key={id}>
            <Link to={`/Surah/${id}`} style={{ textDecoration: 'none' }}>
              <div className='surah-div'>
                {/* <p className='surah-en-name' style={{ width:"120px", textDecorationLine:'none', fontSize: '140%', borderRadius: '12px', color: "#032D2B" }}>{en_name}</p> */}
                {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> */}
                  <p style={{ textDecorationLine:'none', fontSize: '140%', borderRadius: '12px', fontFamily:"Jameel Noori Nastaleeq", color: "#032D2B", padding: '0px 20px 0px 0px' }}>{name}</p>
                  <div classname="container">
                    <img style={{width: '70px', marginBottom: '0px'}} src={circleArt} alt="Circle-Art" />
                    <div classname="centered" style={{ padding: '0px', margin:'0px', color:'#032D2B', textDecorationLine:'none' }}>{id}</div>
                  </div>
                {/* </div> */}
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
