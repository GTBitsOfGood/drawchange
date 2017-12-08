// NPM Packages
import PropTypes from "prop-types";
import React from "react";
import { Switch, Route } from "react-router-dom";

// Local Imports
import VolunteerDashboard from "../VolunteerDashboard";
import EventContainer from "../EventContainer";
import PostRegisterSplash from "../../components/PostRegisterSplash";

export const PendingContainer = () => (
  <Switch>
    <Route path={"/"} component={PostRegisterSplash} />
  </Switch>
);
