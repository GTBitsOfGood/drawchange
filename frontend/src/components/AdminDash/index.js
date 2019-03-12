import React, { Component } from 'react';
import ApplicantList from './ApplicantList';
import ApplicantInfo from './ApplicantInfo';
import { Button, Input } from 'reactstrap';
import Filters from './Filters';
import InfiniteScroll from '../Shared/InfiniteScroll';
import Icon from '../Shared/Icon';
import {
  filterApplicants,
  fetchApplicants,
  updateApplicantStatus,
  searchApplicants
} from './queries';
import { RequestContext } from '../Shared/RequestResult';
import styled, { withTheme } from 'styled-components';

const Styled = {
  Container: styled.div`
    background: white;
    height: 100%;
    width: 100%;
  `,
  FilterContainer: styled.div`
    display: flex;
    margin-bottom: 1rem;
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
      showFilterModal: false,
      appliedFilters: null,
      applicants: [],
      textInput: ''
    };
  }

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
    this.setState({
      appliedFilters: filters
    });
    filterApplicants(filters).then(response =>
      this.setState({
        applicants: response.data.users
      })
    );
  };

  onSearchSubmit = target => {
    var inputquery = document.getElementById('textinp').value;
    if (target.charCode == 13) {
      searchApplicants(inputquery).then(response =>
        this.setState({
          applicants: response.data.users
        })
      );
    }
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
  render() {
    const {
      selectedApplicantIndex,
      showFilterModal,
      applicants,
      appliedFilters,
      isLoading,
      getApplicantEmails
    } = this.state;
    return (
      <Styled.Container>
        <Styled.Main>
          <InfiniteScroll loadCallback={this.onLoadMoreApplicants} isLoading={isLoading}>
            <ApplicantList
              applicants={applicants}
              selectApplicantCallback={this.onSelectApplicant}
              selectedIndex={selectedApplicantIndex}
            >
              <Styled.FilterContainer>
                <Input
                  type="text"
                  id="textinp"
                  placeholder="Search by content"
                  onKeyPress={this.onSearchSubmit}
                />
                <Button onClick={this.onShowFilterModal}>Filter</Button>
              </Styled.FilterContainer>
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
        <Filters
          show={showFilterModal}
          appliedFilters={appliedFilters}
          toggleCallback={this.onShowFilterModal}
          submitCallback={this.onApplyFilters}
        />
      </Styled.Container>
    );
  }
}

export default withTheme(AdminDash);

AdminDash.contextType = RequestContext;
