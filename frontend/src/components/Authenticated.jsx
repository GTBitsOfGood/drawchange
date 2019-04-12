import React from 'react';

import { VolunteerApp, VolunteerDash, PendingVolunteer, AdminDash, UserContext } from '.';

const Authenticated = () => (
  <UserContext.Consumer>
    {({ userRole }) => (
      <React.Fragment>
        {userRole === 'admin' && <AdminDash />}
        {userRole === 'pending' && <PendingVolunteer />}
        {userRole === 'volunteer' && <VolunteerDash />}
        {userRole === 'new' && <VolunteerApp />}
      </React.Fragment>
    )}
  </UserContext.Consumer>
);

export default Authenticated;
