import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loading from './Loading';

const Styled = {
  Container: styled.div`
    overflow-y: scroll;
    position: relative;
  `,
  BottomSpacing: styled.div`
    height: 10rem;
  `
};

class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.containerRef = React.createRef();
    this.state = { displayTimeout: false };
  }
  scrollCallback = ({ scrollHeight, clientHeight, scrollTop }) => {
    if (scrollHeight - clientHeight - scrollTop <= 0) {
      if (!this.state.displayTimeout) this.props.loadCallback();
      this.setState({
        displayTimeout: true
      });
      setTimeout(() => {
        this.setState({
          displayTimeout: false
        });
      }, 1000);
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
        {isLoading || this.state.displayTimeout ? <Loading /> : <Styled.BottomSpacing />}
      </Styled.Container>
    );
  }
}

InfiniteScroll.propTypes = {
  loadCallback: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
};

export default InfiniteScroll;
