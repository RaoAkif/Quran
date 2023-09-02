import { Link } from 'react-router-dom';
import { surahData } from '../../surahData';
import "../App.css";
import "./SurahShowcase.css";
import header from '../assets/images/header.jpg';
import circleArt from '../assets/images/number-circle.png';
import { useState, useEffect } from 'react';

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
  
  // Define state for the popup
  const [showPopup, setShowPopup] = useState(false);

  // Update stored values when checkbox values change
  useEffect(() => {
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
  }, [checkboxes]);

  // Function to clear all checkboxes
  const handleClearAll = () => {
    setShowPopup(true);
  }

  // Function to handle "Yes" button click
  const handleYes = () => {
    setCheckboxes({});
    setShowPopup(false);
  }

  // Function to handle "No" button click
  const handleNo = () => {
    setShowPopup(false);
  }

  return (
    <>
    {showPopup ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: '30vh auto', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontFamily: "Jameel Noori Nastaleeq"}}>
            کیا آپ نے قرآن مجید ختم کر لیا ہے؟<br />
            اور اب لسٹ کلیئر کرنا چاہتے ہیں؟
          </h2>
          <div>
            <button style={{ width: '70px', height: '40px', padding: '10px', borderRadius: '5px', border: 'none', marginRight: '10px' }} onClick={handleYes}>Yes</button>
            <button style={{ width: '70px', height: '40px', padding: '10px', borderRadius: '5px', border: 'none', marginLeft: '10px' }} onClick={handleNo}>No</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', fontFamily: "Jameel Noori Nastaleeq" }}>
      <img style={{width: "100vw"}} src={header} alt="header" />
      <button style={{ display: 'flex', marginLeft: '3vw', padding: '10px', borderRadius: '5px', border: 'none', marginBottom: '10px' }} onClick={handleClearAll}>Clear All</button>
      <div>
        {Object.entries(surahData).map(([id, { en_name, name }]) => (
          <li style={{ textAlign: 'center', fontFamily: "Jameel Noori Nastaleeq" }} key={id}>
            <div className='surah-div' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <input
                type="checkbox"
                style={{ width: '20px', height: '20px', color: '#032D2B' }}
                checked={checkboxes[id] || ''}
                onChange={event => {
                  const checkboxValue = event.target.checked;
                  setCheckboxes(prevCheckboxes => ({
                    ...prevCheckboxes,
                    [id]: checkboxValue,
                  }));
                }}
              />
              <Link to={`/Surahs/${id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <p style={{ textDecorationLine: 'none', fontSize: '140%', borderRadius: '12px', border: 'none', fontFamily: "Jameel Noori Nastaleeq", color: "#032D2B", padding: '0px 20px 0px 0px' }}>{name}</p>
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
      )}
    </>
    
  )
};

export default Surahs;
