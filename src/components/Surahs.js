import { Link } from 'react-router-dom';
import { surahData } from '../surahData';
import "../App.css"
import "./SurahShowcase.css"
import header from '../images/header.png';
import circleArt from '../images/number-circle.png';
import React, { useState, useEffect } from 'react';

const Surahs = () => {
    // Load stored checkbox values on component mount
    useEffect(() => {
      const storedValues = JSON.parse(localStorage.getItem('checkboxes'));
      if (storedValues) {
        setCheckboxes(storedValues);
      }
    }, []);
  
    // Define state for the checkbox values
    const [checkboxes, setCheckboxes] = useState({});
  
    // Update stored values when checkbox values change
    useEffect(() => {
      localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

  return (
    <div style={{ textAlign: 'center', fontFamily: "Jameel Noori Nastaleeq" }}>
      <img style={{ width: "75vw" }} src={header} alt="header" />
      <div>
        {Object.entries(surahData).map(([id, { en_name, name }]) => (
          <li style={{ textAlign: 'center', fontFamily: "Jameel Noori Nastaleeq" }} key={id}>
            <div className='surah-div' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
                type="checkbox"
                style={{ width: '20px', height: '20px', color: '#032D2B' }}
                checked={checkboxes[id]}
                onChange={event => {
                  const checkboxValue = event.target.checked;
                  setCheckboxes(prevCheckboxes => ({
                    ...prevCheckboxes,
                    [id]: checkboxValue,
                  }));
                }}
              />
              <Link to={`/Surah/${id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <p style={{ textDecorationLine: 'none', fontSize: '140%', borderRadius: '12px', fontFamily: "Jameel Noori Nastaleeq", color: "#032D2B", padding: '0px 20px 0px 0px' }}>{name}</p>
                  <div className="container">
                    <img style={{ width: '70px', marginBottom: '0px' }} src={circleArt} alt="Circle-Art" />
                    <div className="centered" style={{ padding: '0px', margin: '0px', color: '#032D2B', textDecorationLine: 'none' }}>{id}</div>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
