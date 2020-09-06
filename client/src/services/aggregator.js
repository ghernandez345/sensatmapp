/**
 * Aggregator service that can take in a collection of reading data and spits out
 * a new collection aggregated data.
 */

import SortingUtils from '../utilities/sortingUtils';

const Aggregator = {

  /**
   * Returns a dataset of median 
   * The dataset returned has this format:
   * [
   *  {sensor_type: 'TEMP', median: 5, unit: 'C'}
   *  ...
   * ]
   */
  getMedianData: (data) => {
    if (data === null) return null;
    const sensorTypeMapping = reduceBySensorType(data);
    return computeMedians(sensorTypeMapping);
  }
};

/**
 * Reduces a collection of unaggregated reading data into a mapping of sorted data by sensor type.
 */
const reduceBySensorType = (data) => {
  return data.reduce((prev, current) => {
    // create a new readings array if this is the first reading of this type we have processed.
    if (!prev[current.sensor_type]) {
      prev[current.sensor_type] = { readings: [] }
    }
    SortingUtils.insertSorted(current, prev[current.sensor_type].readings, readingCompare);
    return prev;
  }, {});
};

/**
 * Comparator function for two different reading data points.
 */
const readingCompare = function (a, b) {
  if (a.reading < b.reading) return -1;
  if (a.reading > b.reading) return 1;
  return 0;
};

const computeMedians = (sensorMapping) => {
  const medians = [];
  for (const sensorType in sensorMapping) {
    setMedian(sensorMapping[sensorType]);
    medians.push(createMedianData(sensorType, sensorMapping[sensorType]));
  }
  return medians;
};

const setMedian = (sensorData) => {
  const readings = sensorData.readings;
  const midpoint = parseInt(readings.length / 2);
  if (readings.length % 2 === 0) {
    sensorData.median = (readings[midpoint].reading + readings[midpoint - 1].reading) / 2
  } else {
    sensorData.median = readings[midpoint].reading;
  }
}

const createMedianData = (sensorType, data) => {
  return {
    sensor_type: sensorType,
    median: data.median,
    unit: data.readings[0].unit
  }
}

export default Aggregator;
