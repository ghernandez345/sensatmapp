import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

describe('Table component', () => {

  it('should render underlying 3rd party Table component', () => {
    const { getByText } = render(
      <Table 
        title='test table'
        columns={[
          {title: 'First Name', field: 'name'},
          {title: 'Surname', field: 'surname'}
        ]}
        data={[{name: 'Gabriel', surname: 'Hernandez'}]}
      />
    );
    const titleElement = getByText(/test table/i);
    expect(titleElement).toBeInTheDocument();

    const firstNameElement = getByText(/Gabriel/i);
    const surnameElement = getByText(/Hernandez/i);
    expect(firstNameElement).toBeInTheDocument();
    expect(surnameElement).toBeInTheDocument();
  });
});
