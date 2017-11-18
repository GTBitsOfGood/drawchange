import React from 'react';
import '../assets/stylesheets/ItemDisplay.css';
import ItemList from '.'
class LeftPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div>
              <h1>
                  Item Page
                </h1>
                <div>
                    <ItemList
                        items = {this.props.itemList}


            </div>
      );
  }
}