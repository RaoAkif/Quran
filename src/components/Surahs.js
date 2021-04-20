import { Link } from 'react-router-dom';
import { surahData } from '../surahData';

const Surahs = () => {
  return (
    <div>
      <h1>Surah of Holy Quran</h1>
      <div>
        {Object.entries(surahData).map(([id, { name, link }]) => (
          <li key={id}>
            <Link to={`/Surah/${id}`}>
              <h3>{name}</h3>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
