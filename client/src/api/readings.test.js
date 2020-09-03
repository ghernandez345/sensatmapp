import readingsAPI from './readings';

const mockReadings = {
  readings: [
    {id: "Box-A1-O3", box_id: "Box-A1", sensor_type: "O3"},
    {id: "Box-A1-NO2", box_id: "Box-A1", sensor_type: "NO2"},
    {id: "Box-A1-CO", box_id: "Box-A1", sensor_type: "CO"}
  ]
};

describe('readings api', () => {

  describe ('getReadings method', () => {
    let fetch;

    beforeAll(() => {
      fetch = global.fetch;
    });

    afterAll(() => {
      global.fetch = fetch;
    });

    it('should resolve to a collection of readings on successful call', async () => {
      // mocks fetch implementation
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockReadings),
          status: 200
        })
      );
      const data = await readingsAPI.getReadings();
      expect(data).toEqual(mockReadings);
    });

    it('should resolve to an error result if the response is not 200', async () => {
      // mocks fetch implementation
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
          status: 500
        })
      );
      const data = await readingsAPI.getReadings();
      expect(data).toEqual({error: true, message: new Error()});
    });
  })
});
