import React from 'react';

var MainPane = React.createClass({
  render: function() {
    if (this.props.children) {
      return (
        <div>
          { this.props.children };
        </div>
      );
    }
    else {
      return(
        <div>
          { this.props.placeholder };
        </div>
      );
    }
  }
});