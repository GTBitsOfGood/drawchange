// NPM Packages
import React from "react";
import PropTypes from "prop-types";
import { AdminContainer } from "./admin";
import { VolunteerContainer } from './volunteer';
import { PendingContainer } from "./pending";

export const MainContainer = ({ user, ...props }) => {
  debugger;
  if (user && user.bio.role === "admin") {
    return <AdminContainer {...props} />;
  } else if (user && user.bio.role === "volunteer") {
    return <VolunteerContainer {...props} />;
  } else if (user && user.bio.role === "pending") {
    return <PendingContainer {...props} />;
  }
  return <h1>Something broke in Main Container index.js</h1>;
};

MainContainer.propTypes = {
  user: PropTypes.object
};
