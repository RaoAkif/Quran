import './App.css';
import Home from "./Pages/Home"
import background from "./images/quran.jpg"

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Home />
    </div>
  );
}

export default App;

