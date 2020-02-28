import React from 'react';
import logo from './logo.svg';
import Registration from './components/Registration';
import './App.css';

function App() {
  return (
    <div className="App">
      <Registration/>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
