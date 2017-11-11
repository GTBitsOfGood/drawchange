//NPM Packages
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Local Imports
import LeftPane from '../components/LeftPane';
import MainPane from '../components/MainPane';
import ItemList from '../components/ItemList';
import EventView from '../components/EventView';

const MainContainer = ({ name }) => {
  return (
        <LeftPane>
            <ItemList items={
                [{
                    "name": "event1",
                    "date": "11/11/2017",
                    "location": "location1",
                    "description": "description1",
                    "contact": "contact1",
                    "_id": "in329894322",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event2",
                    "date": "11/12/2017",
                    "location": "location2",
                    "description": "description2",
                    "contact": "contact2",
                    "_id": "in329894323",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event3",
                    "date": "11/13/2017",
                    "location": "location3",
                    "description": "description3",
                    "contact": "contact3",
                    "_id": "in329894324",
                    "volunteers": [],
                    "max_volunteers": null
                },
                {
                    "name": "event4",
                    "date": "11/14/2017",
                    "location": "location4",
                    "description": "description4",
                    "contact": "contact4",
                    "_id": "in329894325",
                    "volunteers": [],
                    "max_volunteers": null
                }]
            }
            title={"Events"}
            updateCurrentEvent={this.props.updateCurrentEvent}
            />
        </LeftPane>
        <MainPane>
          <EventView />
        </MainPane>
  );
};

MainContainer.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    // name: state.name
    currentEvent: state._id;
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions,dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);
