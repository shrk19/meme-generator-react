import './App.css';
import Navbar from './components/Navbar';
import Meme from './components/Meme';
import MemeGenerated from './components/MemeGenerated';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
   
    <Navbar title="Meme Generator"/>
      <Routes>
        <Route exact path="/" element={<Meme/>} />
        <Route path="/generated" element={<MemeGenerated/>} />
      </Routes>
    </>
  );
}

export default App;
