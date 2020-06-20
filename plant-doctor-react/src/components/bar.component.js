import React, { Component } from 'react';

export default class Bar extends Component {
    constructor(props) {
        super(props);

   
    }

    
    render() {
      let styles = {

        bar: {
          width: 300,
          height: 35,
          borderRadius: 5,
          margin: 5,

            
        }
      }

   
        return (
          <form>
            <input 
              style={styles.bar}
              type="text"
              placeholder="ex: brown leaves"
              value={this.props.searchBarText}
              onChange={this.props.onChangeBar}
            />

          </form>
        );
      }
}
