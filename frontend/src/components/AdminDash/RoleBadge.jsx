import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Shared/Tag';
import { withTheme } from 'styled-components';

const roleToColorMap = {
  Pending: 'warning',
  Volunteer: 'success',
  admitted: 'success',
  denied: 'warning',
  got_initial_email: 'warning',
  responded_to_email: 'warning'
};

const RoleBadge = ({ status, selected, theme }) => (
  <Tag
    type={roleToColorMap[status] || ''}
    color={selected ? theme.grey9 : ''}
    textColor={selected ? theme.primary : ''}
    text={keyToLabel(status)}
  />
);

const keyToLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  return capitalizedWords.join(' ');
};

RoleBadge.propTypes = {
  status: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  theme: PropTypes.object
};

export default withTheme(RoleBadge);
