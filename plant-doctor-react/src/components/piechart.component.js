import React, { useState,Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


    var pieChartData = [
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
    ];

    var colors = {
         "overwatered": "#00009c" ,

         "more water": "#0000AA",

         "fertilize": "#000080",

         "inconsistent watering": "#0047ab",

         "soil too wet": "#000133",

         "less direct light": "#89CFF0",

         "less bright light": "#2e5090",

         "brighter light": "#003366",

         "fungus": "#0073cf",

         "humidity": "#2a52be",

         "repot": "#00008b",

         "pests": "#0054b4",

         "normal": "#1034a6"


      




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

                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}

                onClick={(event, index) => {
                    // action('CLICK')(event, index);
                    console.log('CLICK', { event, index });
                    this.props.changeIndex(pieChartData[index].title)
                  
                    // setSelected(index === selected ? undefined : index);
                  }}

            
                />
                </div>
            
            );
        }
            
}
