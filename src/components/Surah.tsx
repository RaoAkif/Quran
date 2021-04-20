import { surahData } from '../surahData';
import ReactPlayer from 'react-player/youtube'

import '../App.css'

export const Surah = () => {

  let surah = surahData;


  return (
      <div className="body-container">
        <h2>{surah.name}</h2>
        <ReactPlayer url={surah.link} />
      </div>
  );
};