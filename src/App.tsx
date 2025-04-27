import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';

function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' Component={Home} element={< Home />} />
      </Routes>      
    </div>
  );
}

export default App;
