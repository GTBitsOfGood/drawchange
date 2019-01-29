import React from 'react';
import PropTypes from 'prop-types';

import { VolunteerApp, VolunteerDash, PendingVolunteer, AdminDash } from '.';

const Authenticated = ({ user }) => (
  <div>
    {user.role === 'admin' && <AdminDash user={user} />}
    {user.role === 'pending' && <PendingVolunteer user={user} />}
    {user.role === 'volunteer' && <VolunteerDash user={user} />}
    {user.role === 'new' && <VolunteerApp />}
  </div>
);

Authenticated.propTypes = {
  user: PropTypes.object.isRequired
};

export default Authenticated;
