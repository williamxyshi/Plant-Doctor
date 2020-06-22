import React, { Component } from 'react';

import Bar from "./bar.component";
import PlantBar from "./plant-bar.component";

import ResultChart from "./piechart.component";

import axios from 'axios';

import posed from 'react-pose';

let lateStyles = {
    left : {
        height : '100%',
        width : "20%",
        display: 'flex',
        left: 0,
        top: 0,
        position: 'absolute',
        background: "#354F52"


    },




    right : {
        height : '100%',
        width : "20%",
        display: 'flex',
        right: 0,
        top: 0,
        position: 'absolute',
        background: "#354F52"

    },
}

    function ShowPieChart(props) {
        return <ResultChart serverResponse = {props.serverResponse}  />;
    }
  
    function Blank(props) {
        return <h1></h1>;
    }
  
  function ShowChart(props) {
    const showResults = props.showResults;
    if (showResults) {
      return <ShowPieChart serverResponse = {props.serverResponse} />;
    }
    return <Blank />;
  }

  const LeftBox = posed.div({
    searching: { 
        height : '0%',
        width : "20%",
        display: 'flex',
        left: 0,
        bottom: 0,
        position: 'absolute',
        background: "#354F52" },
    results: { 
        height : '100%',
        width : "20%",
        display: 'flex',
        left: 0,
        bottom: 0,
        position: 'absolute',
        background: "#354F52" }
  });
  const RightBox = posed.div({
    searching: { 
        height : '0%',
        width : "20%",
        display: 'flex',
        right: 0,
        bottom: 0,
        position: 'absolute',
        background: "#354F52" },
    results: { 
        height : '100%',
        width : "20%",
        display: 'flex',
        right: 0,
        bottom: 0,
        position: 'absolute',
        background: "#354F52" }
  });


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
            center:{
                marginTop: 50
            },
        
            left : {
                height : '100%',
                width : "20%",
                display: 'flex',
                left: 0,
                top: 0,
                position: 'absolute',
                background: "#354F52"
        
            
        
            },

            right : {
                height : '100%',
                width : "20%",
                display: 'flex',
                right: 0,
                top: 0,
                position: 'absolute',
                background: "#354F52"
        
            
        
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

                <ShowChart showResults={!this.state.searchingState}  serverResponse = {this.state.serverResponse}
                style = {styles.center}/>

                <LeftBox pose = {this.state.searchingState? 'searching' : 'results'}>



                </LeftBox>

                <RightBox pose = {this.state.searchingState? 'searching' : 'results'}>



                </RightBox>

            </div>


            
        )
    }
}
