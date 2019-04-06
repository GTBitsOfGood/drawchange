import React, { Component } from 'react';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './ApplicantInfo';
import InfiniteScroll from '../Shared/InfiniteScroll';
import { Icon, Loading } from '../Shared';
import { filterApplicants, fetchMoreApplicants, searchApplicants } from './queries';
import styled, { withTheme } from 'styled-components';
import ApplicantSearch from './ApplicantSearch';

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
  MailAll: styled.a`
    background: ${props => props.theme.grey9};
    color: ${props => props.theme.grey3};
    border: 1px solid ${props => props.theme.grey7};
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    margin: auto;
    span {
      margin-left: 0.5rem;
    }
  `,
  MailAllContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 1rem;
  `
};
class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      selectedApplicantIndex: 0,
      applicants: []
    };
  }

  onSelectApplicant = index => {
    this.setState({
      selectedApplicantIndex: index
    });
  };

  onLoadMoreApplicants = () => {
    this.setState({
      isLoading: true
    });

    const { applicants } = this.state;
    const lastPaginationId = applicants.length ? applicants[applicants.length - 1]._id : 0;

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

  onChangeComment = comment => {
    const index = this.state.selectedApplicantIndex;
    let applicants = this.state.applicants;
    if (!applicants[index].comments) {
      applicants[index].comments = [];
    }
    applicants[index].comments.push(comment);
    this.setState({
      applicants
    });
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
              <Styled.MailAllContainer>
                <Styled.MailAll
                // href={`mailto:${applicants &&
                //   applicants.reduce((acc, curr) => {
                //     return acc.concat(curr.bio.email);
                //   }, [])}`}
                >
                  <Icon color={this.props.theme.grey3} name="mail" />
                  <span>Compose Mass Email</span>
                </Styled.MailAll>
              </Styled.MailAllContainer>
            </ApplicantList>
          </InfiniteScroll>
          <Styled.ApplicantInfoContainer loading={!applicants || !applicants.length}>
            {applicants && applicants.length ? (
              <ApplicantInfo
                applicant={applicants[selectedApplicantIndex]}
                onChangeComment={this.onChangeComment}
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

export default withTheme(AdminDash);
