import './App.css';
import RouterConfig from "./components/RouterConfig"
import background from "./images/quran.jpg"

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <RouterConfig />
    </div>
  );
}

export default App;

