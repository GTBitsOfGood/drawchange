// NPM Packages
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import { connect } from 'react-redux';
// Local Imports
import EditProfileForm from './forms/EditProfileForm';

// Home component

const VolunteerProfileInd = () => {
    return (
          <div>
            
            <EditProfileForm />
          </div>
      )
};

export default VolunteerProfileInd;
