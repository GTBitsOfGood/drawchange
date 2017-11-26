import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

const data = [
  {
    name: 'Tanner Linsley',
    age: 26,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    },
  }, {
    name: 'Andre Hijaouy',
    age: 20,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    }
  },
  {
    name: 'Tanner Linsley2',
    age: 26,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    },
  }, {
    name: 'Andre Hijaouy2',
    age: 20,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    },
  }, {
    name: 'Andre Hijaouy',
    age: 20,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    }
  },
  {
    name: 'Tanner Linsley2',
    age: 26,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    },
  }, {
    name: 'Andre Hijaouy2',
    age: 20,
    bio: {
      first_name: 'Jason',
      last_name: 'Smith',
    }
  }
];

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
},
{
  Header: 'Age',
  accessor: 'age' // String-based value accessors!
},
{
  id: 'full_name', // Required because our accessor is not a string
  Header: 'Full Name',
  accessor: d => (`${d.bio.first_name}  ${d.bio.last_name}`) // Custom value accessors!
}, ];


function showPagination(size) {
  return size > 5;
}
const PendingVolunteers = (props) => (
  <div>
    <ReactTable
      data={data}
      columns={columns}
      defaultPageSize={5}
      showPageSizeOptions={false}
      showPagination={showPagination(data.length)}
      className="-striped -highlight"
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e) => {
            console.log(rowInfo.original);
          }
        };
      }}
    />
  </div>
);

PendingVolunteers.propTypes = {
};

export default PendingVolunteers;
