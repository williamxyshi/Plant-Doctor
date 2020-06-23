import React, { Component } from 'react';

import Bar from "./bar.component";
import PlantBar from "./plant-bar.component";

import ResultChart from "./piechart.component";

import axios from 'axios';

import posed from 'react-pose';

import ComplexList from './list.component'

import PostList from './postlist.component'

import Spinner from 'react-bootstrap/Spinner'

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

    overflow: {
        overflow: 'scroll'
    },

    details:{
        position: "absolute",
        right: 0,
    }
}

    function ShowPieChart(props) {
        return <ResultChart serverResponse = {props.serverResponse}  changeIndex = {props.changeIndex}/>;
    }
  
    function Blank(props) {
        return <h1></h1>;
    }
  
  function ShowChart(props) {
    const showResults = props.showResults;
    if (showResults) {
      return <ShowPieChart serverResponse = {props.serverResponse} changeIndex = {props.changeIndex}/>;
    }
    return <Blank />;
  }

    function ShowLeft(props) {
        const showResults = props.showResults;
        if (showResults) {
        return <ComplexList serverResponse = {props.serverResponse} clickedIndex = {props.clickedIndex} style = { lateStyles.overflow} />;
        }
        return <Blank />;
    }

    function ShowRight(props) {
        const showResults = props.showResults;
        if (showResults) {
        return <PostList serverResponse = {props.serverResponse} clickedTag = {props.clickedTag} style = { lateStyles.overflow} />;
        }
        return <Blank />;
    }

    function ShowDetailsText(props) {
        const showResults = props.showResults;
        if (showResults) {
        return <h3>Details</h3>
        }
        return <Blank />;
    }


  const LeftBox = posed.div({
    searching: { 
        height : '0%',
        width : "25%",
        display: 'flex',
        left: 0,
        bottom: 0,
        position: 'absolute',

        overflowX: "hidden",
        overflowY:"scroll",

        background: "#354F52" },
    results: { 
        height : '100%',
        width : "25%",
        display: 'flex',
        left: 0,
        bottom: 0,
        borderRadius: 10,
        
        overflowX: "hidden",
        overflowY:"scroll",

        position: 'absolute',
        background: "#354F52" }
  });
  const RightBox = posed.div({
    searching: { 
        height : '0%',
        width : "25%",
        display: 'flex',
        right: 0,
        bottom: 0,

        overflowX: "hidden",
        overflowY:"scroll",

        position: 'absolute',
        background: "#354F52" },
    results: { 
        height : '100%',
        width : "25%",
        display: 'flex',
        right: 0,
        bottom: 0,

        overflowX: "hidden",
        overflowY:"scroll",

        borderRadius: 10,
        position: 'absolute',
        background: "#354F52" }
  });


const Box = posed.div({
    searching: { 
        position: "absolute",
        left:"50%",
        right: "50%",
        top:200,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', },
    results: { 
        position: "absolute",
        left:"50%",
        right: "50%",
        top:0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', }
  });

const LoadingContainer = posed.div({
    loading: { 
        height: "auto",
        width: "auto",
        opacity: 1,


        position: "absolute",
        left:"50%",
        right: "50%",

        top: 400,

        display: 'flex',
     },
    notLoading: { 
        height: "auto",
        width: "auto",


        opacity: 0,
        position: "absolute",
        left:"50%",
        right: "50%",
        display: 'flex',
     }
  });

export default class SearchBar extends Component {


    constructor(props) {
        super(props);
        
        this.state = {

            searchBarText: '',
            plantBarText: '',
            serverResponse: ' ',
            searchingState: true,


            clickedTag : "",



            loading: false,

        }

        this.onChangeBar = this.onChangeBar.bind(this);
        
        this.onChangePlantBar = this.onChangePlantBar.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.changeIndex = this.changeIndex.bind(this);
        
    }

    changeIndex(tag){
        this.setState(
            {
                clickedTag: tag
            }
        )
        console.log(tag)
    }

    onSubmit(e) {
        this.setState({ searchingState: true });

        console.log("submit")
        e.preventDefault();

        var problem = this.state.searchBarText;

       
        var plant = this.state.plantBarText;
        console.log(plant)
     

   
        this.setState({
            loading: true
        })
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

                this.setState({
                    loading: false
                })
            
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
            plantBarText: e.target.value
    
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

            spinner: {
                height: 150,
                width: 150,
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

                <LoadingContainer
                    pose = {this.state.loading? 'loading' : 'notLoading'}>
                        <Spinner animation="border" role="status" style = {styles.spinner}>
                    <span className="sr-only">Loading...</span>
                    </Spinner>

                </LoadingContainer>

               

                <ShowChart showResults={!this.state.searchingState}  serverResponse = {this.state.serverResponse} changeIndex = {this.changeIndex}
                style = {styles.center}/>

                <LeftBox pose = {this.state.searchingState? 'searching' : 'results'}>
                    <ShowLeft showResults={!this.state.searchingState}  serverResponse = {this.state.serverResponse} clickedIndex = {this.state.clickedIndex}/>


                </LeftBox>

                
                <RightBox pose = {this.state.searchingState? 'searching' : 'results'}>
                    <ShowRight showResults={!this.state.searchingState}  serverResponse = {this.state.serverResponse} clickedTag = {this.state.clickedTag}/>



                </RightBox>

            </div>


            
        )
    }
}
