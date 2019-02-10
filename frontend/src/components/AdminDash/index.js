import React, { Component } from 'react';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './ApplicantInfo';
import { Button, Input } from 'reactstrap';
import Filters from './Filters';
import InfiniteScroll from '../Shared/InfiniteScroll';
import dummyUsers from './mockUserData';
import { filterApplicants } from './queries';
import styled from 'styled-components';

const HEADING_HEIGHT = '4rem';

const Styled = {
  Container: styled.div`
    background: white;
    height: 100%;
    width: 100%;
  `,
  Heading: styled.h1`
    font-size: 1.4rem;
    margin: 0;
    height: ${props => props.height};
    padding: calc((${props => props.height} - 1.4rem) / 2) 2rem;
  `,
  FilterContainer: styled.div`
    display: flex;
    margin-bottom: 1rem;
  `,
  Main: styled.div`
    display: flex;
    height: calc(100% - ${props => props.headingHeight});
  `,
  ApplicantInfoContainer: styled.div`
    flex: 1;
    background: #f6f6f6;
    overflow-y: scroll;
    padding: 1rem;
  `
};

export default class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      selectedApplicantIndex: 0,
      showFilterModal: false,
      appliedFilters: [],
      applicants: []
    };
  }
  componentWillMount = () => {};
  onLoadMoreApplicants = () => {
    console.log('loading more users!');
  };
  onSelectApplicant = index => {
    this.setState({
      selectedApplicantIndex: index
    });
  };
  onShowFilterModal = () => {
    this.setState({
      showFilterModal: !this.state.showFilterModal
    });
  };
  onApplyFilters = filters => {
    console.log(filters);
    filterApplicants(filters).then(response =>
      this.setState({
        applicants: response.data.users
      })
    );
  };
  render() {
    const { selectedApplicantIndex, showFilterModal, applicants } = this.state;
    return (
      <Styled.Container>
        <Styled.Heading height={HEADING_HEIGHT}>Admin Dashboard</Styled.Heading>
        <Styled.Main headingHeight={HEADING_HEIGHT}>
          <InfiniteScroll loadCallback={this.onLoadMoreApplicants}>
            <ApplicantList
              applicants={applicants}
              selectApplicantCallback={this.onSelectApplicant}
              selectedIndex={selectedApplicantIndex}
            >
              <Styled.FilterContainer>
                <Input placeholder="Search by content" />
                <Button onClick={this.onShowFilterModal}>Filter</Button>
              </Styled.FilterContainer>
            </ApplicantList>
          </InfiniteScroll>
          <Styled.ApplicantInfoContainer>
            <ApplicantInfo {...dummyUsers[selectedApplicantIndex]} />
          </Styled.ApplicantInfoContainer>
        </Styled.Main>
        <Filters
          show={showFilterModal}
          toggleCallback={this.onShowFilterModal}
          submitCallback={this.onApplyFilters}
        />
      </Styled.Container>
    );
  }
}
