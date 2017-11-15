import React from 'react';

var MainPane = React.createClass({
  render: function() {
    if (this.props.children) {
      return (
        <div className="MainPane">
          { this.props.children };
        </div>
      );
    }
    else {
      return(
        <div className="MainPane MainPane--empty">
          { this.props.placeholder }
        </div>
      );
    }
  }
});

export default MainPane;