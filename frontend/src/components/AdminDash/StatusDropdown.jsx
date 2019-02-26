import React from 'react';
import styled, { withTheme } from 'styled-components';
import { getStatusColor, getStatusLabel, statuses } from './statusHelpers';
import { Icon, Tag } from '../Shared';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  button {
    border: none;
    background: none;
    position: relative;
  }
`;

const OptionContainer = styled.div`
  width: 12rem;
  background: white;
  border: 1px solid ${props => props.theme.grey7};
  border-radius: 0.5rem;
  padding: 0 0.4rem;
  overflow: hidden;
  transition: transform 0.05s;
  transform-origin: top;
  transform: ${props => (props.expanded ? 'scaleY(1)' : 'scaleY(0);')};
`;

const FlexContainer = styled.div`
  position: absolute;
  top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible;

  @media (min-width: 60rem) {
    align-items: flex-end;
  }
`;

const Option = styled.button`
  width: 100%;
  padding: 0.5rem;
  text-align: left;

  :hover {
    background: ${props => props.theme.grey9};
  }
`;

class StatusDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }
  onToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  onSelectStatus = status => {
    this.props.updateStatusCallback(status);
    this.onToggle();
  };
  render() {
    const { theme, status } = this.props;
    return (
      <Container>
        <button onClick={this.onToggle}>
          <Tag type={getStatusColor(status) || ''} text={getStatusLabel(status)}>
            <Icon name="dropdown-arrow" color={theme[getStatusColor(status)].text} size="1.5rem" />
          </Tag>
        </button>
        <FlexContainer>
          <OptionContainer expanded={this.state.expanded}>
            {Object.entries(statuses).map(([key, label]) => (
              <Option key={key} onClick={() => this.onSelectStatus(key)}>
                {label}
              </Option>
            ))}
          </OptionContainer>
        </FlexContainer>
      </Container>
    );
  }
}
export default withTheme(StatusDropdown);
