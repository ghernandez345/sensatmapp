/**
 * requests for reading resources are implemented here
 */

const getReadings = async () => {
  try {
    const response = await fetch('/api/readings');
    const readings = await response.json();
    if (response.status !== 200) throw Error();  
    return readings;
  } catch (e) {
    return {error: true, message: e};
  }
}


export default {
  getReadings
}
