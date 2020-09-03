import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import Readings from './Readings';

describe.only('Readings feature', () => {

  let fetch;

  beforeEach(() => {
    fetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = fetch;
  });

  it('should render a loading state when it initally renders', () => {
    // overriding fetch to a noop will allow us to check what our inital render is.
    global.fetch = jest.fn()

    const { getByText } = render(
      <Readings />
    );
    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render an error message when there is a problem with the request', async () => {
    // we want a error to come back when we try to get the data so we reject the promise
    global.fetch = jest.fn(() =>
      Promise.reject()
    );

    const { getByText } = render(<Readings />);
    const errorElement = await waitForElement(() => getByText(/There was a problem recieving the data/i));
    expect(errorElement).toBeInTheDocument();
  });

  it('should render two tables when there is reading data', () => {

  });
});
