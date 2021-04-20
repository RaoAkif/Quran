import { surahData } from '../surahData.js';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import '../App.css';
import "./SurahShowcase.css"

const Surah = () => {
  let { id } = useParams();
  let surah = surahData[id];

  return (
    <div style={{margin: 'auto',
      width: '50%',
      padding: '10px'}}>
      {/* <h2 style={{textAlign: 'center', fontFamily:"Jameel Noori Nastaleeq"}}>{surah.name}</h2> */}
      <ReactPlayer
      className='react-player'
      url={surah.link}
      controls="true"
      playing="false"
      pip="true"
      width='100%'
      height='100%'
      position= 'absolute'
      top= '0'
      left= '0'
      />
    </div>
  );
};

export default Surah;


