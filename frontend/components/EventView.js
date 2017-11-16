import React from 'react';

var EventView = React.createClass({
  render() {
    return (
			<div className="EventView">
				<div className="EventView__header" />
				<div className="EventView__subheader" />
				<div className="EventView__description" />
				<div className="EventView__information">
					<div className="EventView__contact" />
					<div className="EventView__location" />
				</div>
			</div>
    );
  }
});

export default EventView;