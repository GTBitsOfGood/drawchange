import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: popFromBottom 0.25s forwards;
  `,
  Banner: styled.div`
    padding: 0.5rem;
    background: ${props => (props.success ? 'hsla(127, 100%, 32%, 90%)' : 'black')};
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    margin: auto;

    p {
      font-size: 1.3rem;
      font-weight: 600;
      color: white;
      margin: 0 0.5em;
      padding: 0;
    }
    p.icon {
      font-size: 1.6rem;
      animation: funBounce 0.5s ease-in forwards;
      animation-delay: 0.5s;
    }

    @keyframes funBounce {
      25% {
        transform: scale(1.2) rotate(20deg);
      }
      50% {
        transform: scale(1.2) rotate(-20deg);
      }
      75% {
        transform: scale(1.2) rotate(0deg);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes popFromBottom {
      from {
        bottom: -10rem;
      }
      to {
        bottom: 0;
      }
    }
  `
};

const RequestResult = ({ text, success }) => (
  <Styled.Container>
    <Styled.Banner success>
      <p>{text}</p>
      <p className="icon">🎉</p>
    </Styled.Banner>
  </Styled.Container>
);

export default RequestResult;

RequestResult.propTypes = {
  text: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
};
