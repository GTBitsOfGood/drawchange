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
    this.updateTextFields = this.updateTextFields.bind(this);
    this.updateAvailabilityFilter = this.updateAvailabilityFilter.bind(this);
    this.noFunction = this.noFunction.bind(this);
  }

  updateTextFields() {
    this.props.updateVolunteerFilter(Object.assign({}, this.props.filter, {
      language: this.languageFilter.value.toLowerCase(),
      skills: this.skillsFilter.value.toLowerCase(),
      birthday: this.birthdayFilter.value,
    }));
  }

  updateAvailabilityFilter() {
    let availabilityObj = {
      weekday_mornings: this.weekday_mornings_chk.checked == false ? false : true,
      weekday_afternoons: this.weekday_afternoons_chk.checked == false ? false : true,
      weekday_evenings: this.weekday_evenings_chk.checked == false ? false : true,
      weekend_mornings: this.weekend_mornings_chk.checked == false ? false : true,
      weekend_afternoons: this.weekend_afternoons_chk.checked == false ? false : true,
      weekend_evenings: this.weekend_evenings_chk.checked == false ? false : true,
    }
    let filterSet = {
      set: (availabilityObj.weekday_mornings || availabilityObj.weekday_afternoons || availabilityObj.weekday_evenings ||
          availabilityObj.weekend_mornings || availabilityObj.weekend_afternoons || availabilityObj.weekend_evenings)
    }
    Object.assign(availabilityObj, filterSet);

    this.props.updateVolunteerFilter(Object.assign({}, this.props.filter, {availability: availabilityObj}));
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
                      onChange={this.updateTextFields}
                      ref={(input) => { this.languageFilter = input; }}
                      placeholder="Language"/>
                      <br/>
              <input  type="text"
                      label="Skills"
                      onChange={this.updateTextFields}
                      ref={(input) => { this.skillsFilter = input; }}
                      placeholder="Skills, Qualificaitons, and Interests"/>
                      <br/>
              <input  type="date"
                      label="Birthdate"
                      onChange={this.updateTextFields}
                      ref={(input) => { this.birthdayFilter = input; }}
                      placeholder="Birthdate"/>
              <br/>Availability: <br/>
              <input  type="checkbox"
                      name="weekday_mornings"
                      value="weekday_mornings"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekday_mornings_chk = checkbox; }}
                      /> Weekday Mornings<br/>
              <input  type="checkbox"
                      name="weekday_afternoons"
                      value="weekday_afternoons"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekday_afternoons_chk = checkbox; }}
                      /> Weekday Afternoons<br/>
              <input  type="checkbox"
                      name="weekday_evenings"
                      value="weekday_evenings"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekday_evenings_chk = checkbox; }}
                      /> Weekday Evenings<br/>
              <input  type="checkbox"
                      name="weekend_mornings"
                      value="weekend_mornings"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekend_mornings_chk = checkbox; }}
                      /> Weekend Mornings<br/>
              <input  type="checkbox"
                      name="weekend_afternoons"
                      value="weekend_afternoons"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekend_afternoons_chk = checkbox; }}
                      /> Weekend Afternoons<br/>
              <input  type="checkbox"
                      name="weekend_evenings"
                      value="weekend_evenings"
                      onChange={this.updateAvailabilityFilter}
                      ref={(checkbox) => { this.weekend_evenings_chk = checkbox; }}
                      /> Weekend Evenings<br/>

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
  filter: PropTypes.object
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    filter: state.volunteers.filter
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