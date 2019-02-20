import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Shared/Tag';
import { withTheme } from 'styled-components';

const roleToColorMap = {
  Pending: 'warning',
  Volunteer: 'success',
  Admitted: 'success',
  Denied: 'warning'
};

const RoleBadge = ({ status, selected, theme }) => (
  <Tag
    type={roleToColorMap[status] || ''}
    color={selected ? theme.grey9 : ''}
    textColor={selected ? theme.primary : ''}
    text={status}
  />
);

RoleBadge.propTypes = {
  status: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  theme: PropTypes.object
};

export default withTheme(RoleBadge);
