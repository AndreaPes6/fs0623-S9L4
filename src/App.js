import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';  
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id='contenitoreHome'>
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
