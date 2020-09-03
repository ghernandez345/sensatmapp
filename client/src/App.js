import React from 'react';
import readingsAPI from './api/readings';
import './App.css';

function App() {
  return (
    <div className="App">
      test
    </div>
  );
}

readingsAPI.getReadings();

export default App;
