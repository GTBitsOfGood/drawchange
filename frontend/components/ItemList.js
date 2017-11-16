import React from 'react';
import PropTypes from 'prop-types';

import InlineItem from './InlineItem';
import '../assets/stylesheets/ItemDisplay.css';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem() {
    return (
      <div className="ItemList">
        { this.props.items.map((item) => (
          <InlineItem
            name = {item.name}
            date = {item.date}
            location = {item.location}
            description = {item.description}
            id = {item._id}
            updateCurrentEvent = {this.props.updateCurrentEvent}
          />
        )) }
      </div>
    );
  }

  render() {
    return (
      <div>
      <h1>
          Item Page
      </h1>
      <div>
          {this.renderItem()}
      </div>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  updateCurrentEvent: PropTypes.func,
  updateRenderItem: PropTypes.func
};

export default ItemList;