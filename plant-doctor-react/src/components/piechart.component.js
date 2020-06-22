import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


    var pieChartData = [
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
    ];

    var colors = {
         "overwatered": "#774936" ,
         "more water": "#8A5A44",
         "fertilize": "#9D6B53",
         "inconsistent watering": "#B07D62",
         "soil too wet": "#C38E70",
         "less direct sunlight": "#CD9777",
         "less bright sunlight": "#D69F7E",
         "brighter light": "#DEAB90",
         "fungus": "#E6B8A2",

         "more humidity": "#EDC4B3",

         "less humidity": "#306B34",

         "repot": "#86A397",
         "pests": "#1D3354",

         "normal": "#F94144"


      




    }

    


    var totalTags = 0;
    var tagMap = new Map();

export default class ResultChart extends Component {
    constructor(props) {
        super(props);

        this.parseData()
        this.setData()
   
    }


    setData() {
        pieChartData = []
        tagMap.forEach(function(value, key) {
            console.log(key + ' = ' + value)

            pieChartData.push({
                title: String(key),
                value: (value/totalTags)*100,
                color: colors[key]

            })



          })




    }


    parseData() {

   
        

        var response = this.props.serverResponse

        for(var i = 0; i < response.length; i++){
            var resp = response[i]
            

            for(var j=0; j< resp.comments.length; j++){
                var comment = resp.comments[j]
                console.log(comment)
                for(var k=0; k<comment.tags.length; k++){
                    if(tagMap.has(comment.tags[k])){
                        tagMap.set(comment.tags[k],   
                            tagMap.get(comment.tags[k]) + 1
                            
                            )
                    } else {
                        tagMap.set(comment.tags[k], 1)
                    }
                    
                    totalTags++


                }


            }

        }

        console.log(tagMap)






    }

     
    render() {
        let styles = {
    
            bar: {
                width: 800,
                height: 450,
                elevation: 5,
                
                bottom: 0,
                top: 0,
                position: "absolute",
                right: 0,
                left: 0,
                margin: "auto",
            
    
                
            }
        }
    
        
            return (
        
                <div style= {styles.bar}>
            <PieChart data={pieChartData} lengthAngle={360} animate 
            animationDuration = {1000}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={(index) => ({
                    fill: pieChartData[index].color,
                    fontSize: '5px',
                    fontStyle: "bold",
                    fontFamily: 'sans-serif',
                })}
                radius={42}
                labelPosition={112}

    
                />
                </div>
            
            );
        }
            
}
