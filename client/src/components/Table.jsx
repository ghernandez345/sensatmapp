/**
 * Wraps the 3rd party UI table component.
 * Makes it easier to switch out or change underlying table functionality in the future.
 */


import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';


const Table = (props) => {
  const {
    title,
    columns,
    data,
    options
  } = props;

  return (
    <MaterialTable 
      title={title}
      columns={columns}
      data={data}
      options={options}
    />
  );
};

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    sorting: PropTypes.bool,
    filtering: PropTypes.bool
  })
};

Table.defaultProps = {
  title: '',
  options: {
    sorting: false,
    filtering: false
  }
};


export default Table;
