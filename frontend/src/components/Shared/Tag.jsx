import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const defaultColors = {
  back: 'hsl(0, 0%, 95%)',
  text: 'hsl(0, 0%, 10%)'
};

const Styled = {
  Span: styled.span`
    font-weight: 600;
    padding: 0.3em 0.7em;
    border-radius: 0.4em;
    background: ${props => props.color || (props.theme[props.type] || defaultColors).base};
    color: ${props => props.textColor || (props.theme[props.type] || defaultColors).text};
  `
};

const Tag = ({ children, type, color, textColor, text }) => (
  <Styled.Span type={type} color={color} textColor={textColor}>
    {text} {children}
  </Styled.Span>
);

export default Tag;

Tag.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string
};
