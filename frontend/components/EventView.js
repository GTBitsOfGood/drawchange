import React from 'react';

var EventView = React.createClass({
	render() {
		return (
			<div className="EventView">
				<div className="EventView__header"></div>
				<div className="EventView__subheader"></div>
				<div className="EventView__description"></div>
				<div className="EventView__information">
					<div className="EventView__contact"></div>
					<div className="EventView__location"></div>
				</div>
			</div>
		);
	}
})

export default EventView;