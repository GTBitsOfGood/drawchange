import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';


const columns = [
  {
    id: 'full_name', // Required because our accessor is not a string
    Header: 'Full Name',
    accessor: d => (`${d.bio.first_name}  ${d.bio.last_name}`), // Custom value accessors!
    filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
  },
  {
    Header: 'Email',
    accessor: 'bio.email',
    minWidth: 150,
  },
  {
    Header: 'Phone Number',
    accessor: 'bio.phone_number',
    maxWidth: 150,
    filterable:false
  }
];


function showPagination(size) {
  // return false;
  return size > 8;
}
const AllVolunteers = (props) => (
  <div>
    <ReactTable
      data={props.data}
      filterable
      columns={columns}
      defaultPageSize={8}

      showPageSizeOptions={false}
      showPagination={showPagination(props.data.length)}
      className="-striped -highlight"
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e) => props.updateVolunteer(rowInfo.original._id)
        };
      }}
    />
  </div>
);

AllVolunteers.propTypes = {
};

export default AllVolunteers;
