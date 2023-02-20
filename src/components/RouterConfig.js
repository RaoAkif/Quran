import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import Surahs from "./Surahs";
import SurahShowcase from "./SurahShowcase";
import '../App.css';


export const RouterConfig = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/Surahs"><Surahs /></Route>
      <Route exact path="/Surah/:id"><SurahShowcase /></Route>
    </Switch>
  </Router>
  );
};


