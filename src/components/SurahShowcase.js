import { surahData } from '../surahData.js';
import ReactPlayer from 'react-player/youtube';
import { useParams } from 'react-router-dom';
import '../App.css';

const Surah = () => {
  let { id } = useParams();
  let surah = surahData[id];

  return (
    <div className="body-container">
      <h2>{surah.name}</h2>
      <ReactPlayer url={surah.link} />
    </div>
  );
};

export default Surah;
