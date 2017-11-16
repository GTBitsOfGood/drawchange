import React from 'react';
import '../assets/stylesheets/ItemDisplay.css';

var LeftPane = React.createClass({
  render: function() {
    if (this.props.children) {
      return (
        <div className="LeftPane">
          { this.props.children };
        </div>
      );
    }
    
      return(
        <div className="LeftPane LeftPane--empty">
          { this.props.placeholder };
        </div>
      );
    
  }
});

export default LeftPane;