import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';

function App() {
  useEffect(()=>{
    document.title = 'Luthien Travels'
  },[])
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
