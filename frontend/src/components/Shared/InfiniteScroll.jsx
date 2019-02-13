import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loading from './Loading';

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
    if (scrollHeight - clientHeight - scrollTop <= 0) {
      this.containerRef.current.scrollTop--;
      this.props.loadCallback();
    }
  };
  componentDidMount = () => {
    this.scrollCallback(this.containerRef.current);
    this.containerRef.current.addEventListener('scroll', event =>
      this.scrollCallback(event.target)
    );
  };
  render() {
    const { children, isLoading } = this.props;
    return (
      <Styled.Container ref={this.containerRef}>
        {children}
        {isLoading && <Loading />}
      </Styled.Container>
    );
  }
}

InfiniteScroll.propTypes = {
  loadCallback: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  isLoading: PropTypes.boolean
};

export default InfiniteScroll;
