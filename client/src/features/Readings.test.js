import React from 'react';
import { render, waitForElement, wait } from '@testing-library/react';
import Readings from './Readings';

describe('Readings feature', () => {

  let fetch;

  beforeEach(() => {
    fetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = fetch;
  });

  it('should render a loading state when it initally renders', async () => {
    // we dont care about the response. just what our inital render is.
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({readings: []}),
      status: 200
    });

    const { getByText } = render(<Readings />);

    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
    await wait(() => {});
  });

  it('should render an error message when there is a problem with the request', async () => {
    // we want a error to come back when we try to get the data so we reject the promise
    global.fetch = jest.fn().mockRejectedValue(new Error());

    const { getByText } = render(<Readings />);
    const errorElement = await waitForElement(() => getByText(/There was a problem recieving the data/i));
    expect(errorElement).toBeInTheDocument();
  });

  it('should render two tables when there is reading data', async () => {
    const mockReadings = {
      readings: [
        { id: "Box-A1-O3", box_id: "Box-A1", sensor_type: "O3" },
        { id: "Box-A1-NO2", box_id: "Box-A1", sensor_type: "NO2" },
        { id: "Box-A1-CO", box_id: "Box-A1", sensor_type: "CO" }
      ]
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockReadings),
      status: 200
    });

    const { getByText } = render(<Readings />);
    const readingTable = await waitForElement(() => getByText(/Reading Data/i));
    const medianTable = await waitForElement(() => getByText(/Median Data/i));
    expect(readingTable).toBeInTheDocument();
    expect(medianTable).toBeInTheDocument();
  });
});
