import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/ItemDisplay.css';

class InlineVolunteer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.updateCurrentVolunteer);
    this.name = this.props.first_name + " " + this.props.last_name;
    this.location = this.props.street_address + " , " + this.props.city + " , " + this.props.state;
  }

  render() {
    return(
        <div className="singleItem" onClick= {()=>this.props.updateCurrentVolunteer(this.props.id)}>

                        <div className="userName">
                            {this.name}
                        </div>
                        <div className="userLocation">
                            {this.location}
                        </div>
                        <div className="userNumber" >
                            {this.props.phone_number}
                        </div>
                    </div>
    );
  }
}

InlineVolunteer.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  street_address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  id: PropTypes.string,
  updateCurrentVolunteer: PropTypes.func,
  phone_number: PropTypes.string,
};

export default InlineVolunteer;