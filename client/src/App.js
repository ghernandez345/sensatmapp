import React from 'react';
import readingsAPI from './api/readings';
import './App.css';

import Table from './components/Table';

function App() {
  return (
    <div className='App'>
      <Table 
        title='Reading Data'
      />
    </div>
  );
}

readingsAPI.getReadings();

export default App;
