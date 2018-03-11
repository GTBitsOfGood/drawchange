import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateVolunteerFilter } from '../actions/volunteers.js';
import Text from './inputs/Text';
import { Control, Form, actions } from 'react-redux-form';
import Button from 'react-bootstrap/lib/Button';


class VolunteersFilter extends React.Component {
  constructor(props) {
    super(props);
    this._update = this._update.bind(this);
    this.noFunction = this.noFunction.bind(this);
  }

  _update() {

    this.props.updateVolunteerFilter({
      language: this.languageFilter.value.toLowerCase(),
      skills: this.skillsFilter.value.toLowerCase(),
      birthday: this.birthdayFilter.value
    });
  }

  noFunction() {
    return false;
  }


  render() {
    return (
          <div>

            <form onSubmit={this.noFunction}>
              <input  type="text"
                      label="Language"
                      onChange={this._update}
                      ref={(input) => { this.languageFilter = input; }}
                      placeholder="Language"/>
              <input  type="text"
                      label="Skills"
                      onChange={this._update}
                      ref={(input) => { this.skillsFilter = input; }}
                      placeholder="Skills, Qualificaitons, and Interests"/>
              <input  type="date"
                      label="Birthdate"
                      onChange={this._update}
                      ref={(input) => { this.birthdayFilter = input; }}
                      placeholder="Birthdate"/>

            </form>
            {/*<Form model="forms.volunteerFilter"  >
              <Control required component={Text} model=".language" label="Language" type="text" />
            </Form>

            <Form model="forms.volunteerFilter"  >
              <Control required component={Text} model=".language" label="Language" ref={(Control) => { this.languageFilter = Control; }} type="text" />
              <Button type="submit" bsStyle="primary" onClick={this._update} >FilterX</Button>
            </Form>*/}
          </div>
    );
  }
}


VolunteersFilter.propTypes = {
  updateVolunteerFilter: PropTypes.func,
  language: PropTypes.string,
  skills: PropTypes.string,
  birthday: PropTypes.string
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    language: state.volunteers.filter.language,
    skills: state.volunteers.filter.skills,
    birthday: state.volunteers.filter.birthday
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateVolunteerFilter: filter => {
      dispatch(updateVolunteerFilter(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersFilter);