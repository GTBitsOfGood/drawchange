import React from 'react';

var LeftPane = React.createClass({
  render: function() {
    if (this.props.children) {
      return (
        <div className="LeftPane">
          { this.props.children };
        </div>
      );
    }
    else {
      return(
        <div className="LeftPane LeftPane--empty">
          { this.props.placeholder };
        </div>
      );
    }
  }
});

export default LeftPane;