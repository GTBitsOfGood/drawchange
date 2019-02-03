import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loading from './loading';

const Styled = {
  Container: styled.div`
    overflow-y: scroll;
  `
};

class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.containerRef = React.createRef();
  }
  scrollCallback = ({ scrollHeight, clientHeight, scrollTop }) => {
    if (scrollHeight - clientHeight - scrollTop <= 0) this.props.loadCallback();
  };
  componentDidMount = () => {
    this.scrollCallback(this.containerRef.current);
    this.containerRef.current.addEventListener('scroll', event =>
      this.scrollCallback(event.target)
    );
  };
  render() {
    const { children } = this.props;
    return (
      <Styled.Container ref={this.containerRef}>
        {children}
        <Loading />
      </Styled.Container>
    );
  }
}

InfiniteScroll.propTypes = {
  loadCallback: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default InfiniteScroll;
