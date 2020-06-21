import React, { Component } from 'react';

import Bar from "./bar.component";
import PlantBar from "./plant-bar.component";

import ResultChart from "./piechart.component";

import axios from 'axios';

import posed from 'react-pose';

let styles = {
        
    center : {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 30

    },
  }

function UserGreeting(props) {
    return <ResultChart serverResponse = {props.serverResponse} />;
  }
  
  function GuestGreeting(props) {
    return <h1></h1>;
  }
  
  function Greeting(props) {
    const showResults = props.showResults;
    if (showResults) {
      return <UserGreeting serverResponse = {props.serverResponse}/>;
    }
    return <GuestGreeting />;
  }

const Box = posed.div({
    searching: { 
        marginTop: 250,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', },
    results: { 
        marginTop: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', }
  });

export default class SearchBar extends Component {


    constructor(props) {
        super(props);
        
        this.state = {

            searchBarText: '',
            plantBarText: '',
            serverResponse: ' ',
            searchingState: true

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
            


                this.setState({ searchingState: false });


            
            }
                );

    }

    getServerResponse(){
        return this.state.serverResponse
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
        
            rowSearching : {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 200
    
            },
            rowSearched : {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50
    
            },
          }
     
        return (
            <div>
                <Box pose = {this.state.searchingState? 'searching' : 'results'}>
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


                </Box>

                <Greeting showResults={!this.state.searchingState}  serverResponse = {this.state.serverResponse}
                styles = {styles.center}/>

            </div>


            
        )
    }
}
