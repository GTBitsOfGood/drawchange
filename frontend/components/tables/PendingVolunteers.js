import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

const data = [
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    },
  }, {
    name: 'Andre Hijaouy',
    age: 20,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley2',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    },
  }, {
    name: 'Andre Hijaouy2',
    age: 20,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    },
  }, {
    name: 'Andre Hijaouy',
    age: 20,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  },
  {
    name: 'Tanner Linsley2',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    },
  }, {
    name: 'Andre Hijaouy2',
    age: 20,
    friend: {
      name: 'Jason Maurer',
      age: 23,
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
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: 'Friend Age', // Custom header components!
  accessor: 'friend.age'
}];


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
