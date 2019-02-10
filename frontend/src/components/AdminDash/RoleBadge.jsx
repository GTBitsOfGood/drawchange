import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Shared/Tag';
import { withTheme } from 'styled-components';

const roleToColorMap = {
  Pending: 'warning',
  Volunteer: 'success'
};

const RoleBadge = ({ role, selected, theme }) => (
  <Tag
    type={roleToColorMap[role] || ''}
    color={selected ? theme.grey9 : ''}
    textColor={selected ? theme.primary : ''}
    text={role}
  />
);

RoleBadge.propTypes = {
  role: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  theme: PropTypes.object
};

export default withTheme(RoleBadge);
