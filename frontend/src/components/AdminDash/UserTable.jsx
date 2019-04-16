import React from 'react';
import styled from 'styled-components';
import { roles, statuses } from './applicantInfoHelpers';
import { Loading, Icon } from '../Shared';
import PropTypes from 'prop-types';

const EditIcon = styled.div`
  display: none;
  position: absolute;
  right: 2rem;
  margin-top: -0.2rem;
`;

const Styled = {
  Container: styled.div`
    background: white;
    width: 95%;
    max-width: 80rem;
    border-radius: 0.5rem;
    padding: 1rem;
    border: 0.1rem solid ${props => props.theme.grey9};
  `,
  Table: styled.table`
    width: 100%;

    th {
      color: ${props => props.theme.primaryGrey};
      font-size: 1.2rem;
    }
    th,
    td {
      padding: 1.5rem;
      position: relative;
    }
  `,
  Row: styled.tr`
    ${props => props.evenIndex && 'background: #F7F7F7'};
    cursor: pointer;
    :hover {
      background-color: ${props => props.theme.primary};
      border-radius: 0.5rem;
      color: white;
      transition: background-color 0.3s;
    }
    :hover ${EditIcon} {
      display: initial;
    }
  `,
  LoadingBody: styled.div`
    height: 39rem;
    width: 100%;
    display: flex;
    align-items: center;
  `
};

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedForEdit: null
    };
  }
  onDisplayEditUserModal = userToEdit => {
    console.log(userToEdit);
    this.setState({
      userSelectedForEdit: userToEdit
    });
  };
  onModalClose = updatedUser => {
    if (updatedUser) {
      this.props.editUserCallback(updatedUser);
    }
    this.setState({
      userSelectedForEdit: null
    });
  };
  render() {
    const { users, loading } = this.props;
    return (
      <Styled.Container>
        <Styled.Table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
            {!loading &&
              users.map((user, index) => (
                <Styled.Row
                  key={index}
                  evenIndex={index % 2 === 0}
                  onClick={() => this.onDisplayEditUserModal(user)}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{roles[user.role]}</td>
                  <td>
                    {statuses[user.status]}{' '}
                    <EditIcon>
                      <Icon color="grey9" name="edit" />
                    </EditIcon>
                  </td>
                </Styled.Row>
              ))}
          </tbody>
        </Styled.Table>
        {loading && <Loading />}

        {/* add reactstrap modal to display and pass onModalClose */}
      </Styled.Container>
    );
  }
}

export default UserTable;

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  editUserCallback: PropTypes.func.isRequired
};
