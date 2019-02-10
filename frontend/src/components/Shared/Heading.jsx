import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const levelToFontSizeMap = {
  0: '2rem',
  1: '1.5rem',
  2: '1.2rem'
};

const Styled = {
  Heading: styled.h1`
    font-weight: 600;
    padding: 1rem 0;
    font-size: ${props => levelToFontSizeMap[props.level] || '2rem'};
    color: ${props => props.theme.grey1};
  `
};

const Heading = ({ level, text }) => <Styled.Heading level={level}>{text}</Styled.Heading>;

export default Heading;

Heading.propTypes = {
  level: PropTypes.number,
  text: PropTypes.string.isRequired
};
