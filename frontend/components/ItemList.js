import React from 'react';
import PropTypes from 'prop-types';

import InlineItem from './InlineItem';
class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.items = this.props.items;
    this.title = this.props.title;
    this.updateCurrentEvent = this.props.updateCurrentEvent;
  }
  renderItem() {
    const itemManager = this.items.map((item) =>
        (<div>
            <InlineItem
                name = {item.name}
                date = {item.date}
                location = {item.location}
                description = {item.description}
                id = {item._id}
                updateCurrentEvent = {this.updateCurrentEvent}
            />
        </div>)
        );
    return itemManager;
  }

  render() {
    return (
            <div>
            <h1>
                {this.title}
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
  updateCurrentEvent: PropTypes.func
};