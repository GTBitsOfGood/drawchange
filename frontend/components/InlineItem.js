import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/ItemDisplay.css';

class InlineItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
            <div className="singleItem" onClick= {()=>this.props.updateCurrentEvent(this.props.id)}>

                <div className="itemName">
                    {this.props.name}
                </div>
                <div className="itemDate">
                    {this.props.date}
                </div>
                <div className="itemLocation">
                    {this.props.location}
                </div>
                <div className="itemDescription" >
                    {this.props.description}
                </div>
            </div>
    );
  }

}

InlineItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  updateCurrentEvent: PropTypes.func,
  updateRenderItem: PropTypes.func
};

export default InlineItem;