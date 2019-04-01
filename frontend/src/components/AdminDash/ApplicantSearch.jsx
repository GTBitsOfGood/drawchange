import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import {
  Button,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Icon from '../Shared/Icon';

const FilterContainer = styled.form`
  display: flex;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  width: ${props => (props.show ? '3.2rem' : '0')};
  border: none;
  background: none;
  transition: width 0.2s;
  overflow: hidden;
  padding: 0;
`;

class ApplicantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      placeholder: 'All',
      textInput: '',
      showFilterModal: false,
      appliedFilters: null
    };
  }

  onSearchChange = event => {
    this.setState({ textInput: event.target.value });
    if (event.target.value === '') {
      this.onClearSearch();
    }
  };

  onSubmitSearch = event => {
    event.preventDefault();
    this.props.searchSubmitCallback(this.state.textInput, this.state.placeholder);
  };

  onClearSearch = () => {
    this.setState({ textInput: '' });
    this.props.searchSubmitCallback('', this.state.placeholder);
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  selectSearchOption = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      placeholder: event.target.innerText
    });
  };

  onShowFilterModal = () => {
    this.setState({
      showFilterModal: !this.state.showFilterModal
    });
  };
  onApplyFilters = filters => {
    this.setState({
      appliedFilters: filters
    });
    this.props.applyFiltersCallback(filters);
  };
  render() {
    return (
      <FilterContainer onSubmit={this.onSubmitSearch}>
        <BackButton type="reset" show={this.state.textInput} onClick={this.onClearSearch}>
          <Icon name="back-arrow" />
        </BackButton>
        <Input
          type="text"
          placeholder={'Search By ' + this.state.placeholder}
          onChange={this.onSearchChange}
        />

        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret />
          <DropdownMenu>
            <DropdownItem header>Search by...</DropdownItem>
            <DropdownItem onClick={this.selectSearchOption}>All</DropdownItem>
            <DropdownItem onClick={this.selectSearchOption}>Bio</DropdownItem>
            <DropdownItem onClick={this.selectSearchOption}>Email</DropdownItem>
            <DropdownItem onClick={this.selectSearchOption}>Phone Number</DropdownItem>
            <DropdownItem onClick={this.selectSearchOption}>Comments</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Button onClick={this.onShowFilterModal}>Filter</Button>

        <Filters
          show={this.state.showFilterModal}
          appliedFilters={this.state.appliedFilters}
          toggleCallback={this.onShowFilterModal}
          submitCallback={this.onApplyFilters}
        />
      </FilterContainer>
    );
  }
}
export default ApplicantSearch;
