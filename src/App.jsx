import LandingPage from "./Home";
import { Route, Routes } from "react-router-dom"
import Seller from "./Seller";
import About from "./Pages/About";
import HelpDesk from "./Pages/Help";
import CareerPage from "./Pages/Career";
import DaoApplicationForm from "./DaoForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/sell" element={<Seller/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/help" element={<HelpDesk/>}/>
      <Route path="/career" element={<CareerPage/>}/>
      <Route path="/member" element={<DaoApplicationForm/>}/>
    </Routes>
  );
}

export default App;