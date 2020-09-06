import Aggregator from './aggregator';


describe('aggregator service', () => {

  const unaggregatedData = [
    { sensor_type: 'TEMP', reading: 1, unit: 'C'},
    { sensor_type: 'O3', reading: 20, unit: 'ppm' },
    { sensor_type: 'O3', reading: 10, unit: 'ppm'},
    { sensor_type: 'TEMP', reading: 10, unit: 'C' },
    { sensor_type: 'TEMP', reading: 5, unit: 'C' },
    { sensor_type: 'RH', reading: 50, unit: '%' },
  ]

  it('should return a collection of median aggregated readings', () => {
    const data = Aggregator.getMedianData(unaggregatedData);

    expect(data).toEqual([
      { sensor_type: 'TEMP', median: 5, unit: 'C' },
      { sensor_type: 'O3', median: 15, unit: 'ppm' },
      { sensor_type: 'RH', median: 50, unit: '%' }
    ]);
  });
});
