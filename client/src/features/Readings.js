/**
 * This brings together all other components to display the readings table feature.
 */

import React, {useState, useEffect} from 'react';
import readingsAPI from '../api/readings';
import Table from '../components/Table';
import './Readings.css';

const columns = [
  { title: 'Box', field: 'box_id', sorting: false, filtering: false },
  { title: 'Sensor Type', field: 'sensor_type' },
  { title: 'Name', field: 'name', sorting: false },
  { title: 'Range (lower)', field: 'range_l', sorting: false, filtering: false },
  { title: 'Range (upper)', field: 'range_u', sorting: false, filtering: false },
  { title: 'Longitude', field: 'longitude', sorting: false, filtering: false },
  { title: 'Latitude', field: 'latitude', sorting: false, filtering: false },
  { title: 'Reading', field: 'reading', sorting: false, filtering: false },
  { title: 'Unit', field: 'unit', sorting: false, filtering: false },
  { title: 'Timestamp', field: 'reading_ts', filtering: false },
];


const Readings = () => {
  const [readingData, setReadingData] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Done this way as react hook callbacks are required to be syncronus. Functions inside callback
    // can be async though.
    const fetchReadings = async () => {
      const res = await readingsAPI.getReadings();
      setReadingData(res.readings);
      if (res.error) {
        setFetchError(true);  
      } else {
        setReadingData(res.readings);
      }
    }
    fetchReadings()
  }, []);

  if (fetchError) return 'There was a problem recieving the data';
  if (readingData === null) return 'Loading...';

  return (
    <div className='Readings'>
      <Table 
        title='Reading Data'
        columns={columns}
        data={readingData}
        sorting={true}
        filtering={true}
      />
    </div>
  );
}

readingsAPI.getReadings();

export default Readings;
