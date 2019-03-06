import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SVG = styled.svg`
  padding: 0.1rem;
  padding-bottom: 0.2rem;
`;

const iconData = {
  'dropdown-arrow': (
    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z" />
  ),
  'back-arrow': (
    <path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" />
  )
};

const Icon = ({ name, color, size }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill={color}
    height={size || '2rem'}
    width={size || '2rem'}
  >
    {iconData[name]}
  </SVG>
);

export default Icon;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string
};
