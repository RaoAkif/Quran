import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import Surahs from "./Surahs";
import SurahShowcase from "./SurahShowcase";
import '../App.css';

export const RouterConfig = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="Surahs">
            <Route index element={<Surahs />} />
            <Route path=":id" element={<SurahShowcase />} />
          </Route>
      </Routes>
  );
};
