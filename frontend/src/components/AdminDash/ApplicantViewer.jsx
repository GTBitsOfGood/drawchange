import React, { Component } from 'react';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './ApplicantInfo';
import InfiniteScroll from '../Shared/InfiniteScroll';
import { Icon, Loading } from '../Shared';
import {
  filterApplicants,
  fetchMoreApplicants,
  searchApplicants,
  updateApplicantComments
} from './queries';
import styled from 'styled-components';
import ApplicantSearch from './ApplicantSearch';
import { Button } from 'reactstrap';

const Styled = {
  Container: styled.div`
    background: white;
    height: 100%;
    width: 100%;
  `,
  Main: styled.div`
    display: flex;
    height: 100%;
  `,
  ApplicantInfoContainer: styled.div`
    flex: 1;
    background: #f6f6f6;
    overflow-y: scroll;
    padding: 1rem;

    ${props =>
      props.loading &&
      `
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  `,
  SecondaryOptions: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;

    span {
      margin-left: 0.5rem;
    }
  `
};
class ApplicantViewer extends Component {
  constructor() {
    super();
    this.state = {
      selectedApplicantIndex: 0,
      applicants: []
    };
  }

  onUpdateApplicantComments = comments => {
    if (!comments) return;
    const index = this.state.selectedApplicantIndex;
    let applicants = this.state.applicants;
    setTimeout(() => {
      updateApplicantComments(applicants[index].bio.email, comments).then(() => {
        applicants[index].comments = comments;
        this.setState({
          applicants
        });
      });
    });
  };
  onSelectApplicant = index => {
    this.setState({
      selectedApplicantIndex: index
    });
  };

  onRefreshApplicants = () => {
    this.setState(
      {
        isLoading: true,
        applicants: []
      },
      this.onLoadMoreApplicants
    );
  };

  onLoadMoreApplicants = () => {
    this.setState({
      isLoading: true
    });

    const { applicants } = this.state;
    const lastPaginationId = applicants.length ? applicants[applicants.length - 1]._id : 0;
    console.log(lastPaginationId);

    fetchMoreApplicants(lastPaginationId).then(res =>
      this.setState({
        applicants: [...this.state.applicants, ...res.data.users],
        isLoading: false
      })
    );
  };
  onUpdateApplicantStatus = (applicantEmail, updatedStatus) => {
    this.setState({
      applicants: this.state.applicants.map(applicant => {
        if (applicant.bio.email === applicantEmail) return { ...applicant, status: updatedStatus };
        return applicant;
      })
    });
  };
  onUpdateApplicantRole = (applicantEmail, updatedRole) => {
    this.setState({
      applicants: this.state.applicants.map(applicant => {
        if (applicant.bio.email === applicantEmail) return { ...applicant, role: updatedRole };
        return applicant;
      })
    });
  };

  onSearchSubmit = (textInput, type) => {
    searchApplicants(textInput, type).then(response =>
      this.setState({
        applicants: response.data.users
      })
    );
  };
  onApplyFilters = filters => {
    filterApplicants(filters).then(response =>
      this.setState({
        applicants: response.data.users
      })
    );
  };
  render() {
    const { selectedApplicantIndex, applicants, isLoading } = this.state;
    return (
      <Styled.Container>
        <Styled.Main>
          <InfiniteScroll loadCallback={this.onLoadMoreApplicants} isLoading={isLoading}>
            <ApplicantList
              applicants={applicants}
              selectApplicantCallback={this.onSelectApplicant}
              selectedIndex={selectedApplicantIndex}
            >
              <ApplicantSearch
                searchSubmitCallback={this.onSearchSubmit}
                applyFiltersCallback={this.onApplyFilters}
              />
              <Styled.SecondaryOptions>
                <Button onClick={this.onRefreshApplicants}>
                  <Icon color="grey3" name="refresh" />
                  <span>Refresh</span>
                </Button>
                <Button
                  href={`mailto:${applicants &&
                    applicants.reduce((acc, curr) => {
                      return acc.concat(curr.bio.email);
                    }, [])}`}
                >
                  <Icon color="grey3" name="mail" />
                  <span>Send Mass Email</span>
                </Button>
              </Styled.SecondaryOptions>
            </ApplicantList>
          </InfiniteScroll>
          <Styled.ApplicantInfoContainer loading={!applicants || !applicants.length}>
            {applicants && applicants.length ? (
              <ApplicantInfo
                applicant={applicants[selectedApplicantIndex]}
                onChangeComment={this.onUpdateApplicantComments}
                updateStatusCallback={this.onUpdateApplicantStatus}
                updateRoleCallback={this.onUpdateApplicantRole}
              />
            ) : (
              <Loading />
            )}
          </Styled.ApplicantInfoContainer>
        </Styled.Main>
      </Styled.Container>
    );
  }
}

export default ApplicantViewer;
