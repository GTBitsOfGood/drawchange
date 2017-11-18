import React from 'react';
import '../assets/stylesheets/ItemDisplay.css';
import PropTypes from 'prop-types';

import ItemList from './ItemList';

class LeftPane extends React.Component {
  constructor(props) {
    super(props);

    this.isEvent = this.props.view === "Event" ? true : null;
    this.isVolunteer = this.props.view === "Volunteer" ? true : null;
  }

  render() {
    return (
          <div>
              <h1>
                  Item Page
                </h1>
                {this.isEvent && <ItemList
                        items = {this.props.itemList}
                        updateCurrentEvent = {this.props.updateCurrentEvent}
                        view = {this.props.view}/>}
                {this.isVolunteer && <ItemList
                        items = {this.props.itemList}
                        updateCurrentEvent = {this.props.updateCurrentEvent}
                        view = {this.props.view}/>}

                {/* <div>

                    <ItemList
                        items = {this.props.itemList}
                        updateCurrentEvent = {this.props.updateCurrentEvent}
                        view = {this.props.view}
                    />
                </div> */}
            </div>
    );
  }
}

LeftPane.propTypes = {
  itemList: PropTypes.array,
  updateCurrentEvent: PropTypes.func,
  view: PropTypes.string
};