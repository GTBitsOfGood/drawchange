import React from 'react';
import PropTypes from 'prop-types';

function InlineItem({name, date, location, description, id, updateCurrentEvent}) {
  return(
        <div className="controlSingleItem">
        <div className="singleevent" onClick={() => updateCurrentEvent(id)}>
            <div className="itemName">
                {name}
            </div>
            <div className="itemDate">
                {date}
            </div>
            <div className="itemLocation">
                {location}
            </div>
            <div className="itemDescription" >
                {description}
            </div>
        </div>
        </div>
  );
}

InlineItem.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  updateCurrentEvent: PropTypes.func
};

export default InlineItem;