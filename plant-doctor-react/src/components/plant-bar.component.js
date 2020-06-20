import React, { Component } from 'react';

export default class PlantBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        let styles = {

            bar: {
              width: 100,
              height: 35,
              borderRadius: 5,
              margin: 5,

                
            }
          }


        return (
          <form >
            <input
            style={styles.bar}
              type="text"
              placeholder="ex: pilea"
              value={this.props.plantBarText}
              onChange={this.props.onChangePlantBar}
            />

          </form>
        );
      }
}
