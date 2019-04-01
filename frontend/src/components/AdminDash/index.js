import React, { Component } from 'react';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './ApplicantInfo';
import InfiniteScroll from '../Shared/InfiniteScroll';
import { Icon } from '../Shared';
import {
  filterApplicants,
  fetchApplicants,
  updateApplicantStatus,
  searchApplicants
} from './queries';
import { RequestContext } from '../Shared/RequestResult';
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
  `,
  MailAll: styled.a`
    background: ${props => props.theme.grey9};
    color: ${props => props.theme.grey3};
    border: 1px solid ${props => props.theme.grey7};
    font-weight: bold;
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 0.5rem 1.5rem;
    bottom: 0;

    span {
      margin-left: 0.5rem;
    }
  `,
  MailContainer: styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
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

    fetchApplicants().then(res => this.setState({ applicants: res.data.users, isLoading: false }));
  };
  onUpdateApplicantStatus = (applicantEmail, updatedStatus) => {
    this.context.startLoading();
    setTimeout(() => {
      updateApplicantStatus(applicantEmail, updatedStatus).then(() => {
        this.context.success('Updated status!');
        this.setState({
          applicants: this.state.applicants.map(applicant => {
            if (applicant.bio.email === applicantEmail)
              return { ...applicant, status: updatedStatus };
            return applicant;
          })
        });
      });
    }, 1000);
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
            </ApplicantList>

            <Styled.MailContainer>
              <Styled.MailAll
                href={`mailto:${applicants &&
                  applicants.reduce((acc, curr) => {
                    return acc.concat(curr.bio.email);
                  }, [])}`}
              >
                <Icon color={this.props.theme.grey3} name="mail" />
                <span>Compose Mass Email</span>
              </Styled.MailAll>
            </Styled.MailContainer>
          </InfiniteScroll>
          <Styled.ApplicantInfoContainer>
            <ApplicantInfo
              applicant={applicants[selectedApplicantIndex]}
              onChangeComment={this.onChangeComment}
              onUpdateApplicantStatus={this.onUpdateApplicantStatus}
            />
          </Styled.ApplicantInfoContainer>
        </Styled.Main>
      </Styled.Container>
    );
  }
}

export default withTheme(AdminDash);

AdminDash.contextType = RequestContext;
