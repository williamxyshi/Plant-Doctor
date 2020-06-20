import React, { Component } from 'react';

import Bar from "./bar.component";
import PlantBar from "./plant-bar.component";

import axios from 'axios';

export default class SearchBar extends Component {


    constructor(props) {
        super(props);
        
        this.state = {

            searchBarText: '',
            plantBarText: '',

            serverResponse: ' '

        }

        this.onChangeBar = this.onChangeBar.bind(this);
        
        this.onChangePlantBar = this.onChangePlantBar.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onSubmit(e) {

        console.log("submit")
        e.preventDefault();

        var problem = this.state.searchBarText;
        var plant = this.state.plantBarText;

   
     
        axios.get('http://localhost:4000/plant/getplant', {
            params: {
                plantname: plant,
                plantproblem: problem

            }
        })
            .then(res => {
            
                this.state.serverResponse = res.data

                console.log(this.state.serverResponse)
            
            }
                );

    }

    onChangeBar(e) {
        console.log("issue bar: " + e.target.value)
        this.setState({
            searchBarText: e.target.value
    
        });
        console.log("issue bar: " + this.state.searchBarText)
    }

    onChangePlantBar(e) {
        console.log("plant bar: " + e.target.value)
        this.setState({
            searchBarText: e.target.value
    
        });
    }



    render() {
        let styles = {
        
            row : {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 200
    
            }
          }
     
        return (
            <div style={styles.row}>

                <PlantBar
                    filterText={this.state.plantBarText}
                   
                    onChangePlantBar = {this.onChangePlantBar}
                    
                />

                <Bar
                    filterText={this.state.searchBarText}
                    onChangeBar = {this.onChangeBar}

                />

                <form onSubmit={this.onSubmit}>
                    <button type="submit" className="btn btn-success">search</button>
                </form>


            </div>
        )
    }
}
