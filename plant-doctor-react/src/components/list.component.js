import React, { Component } from 'react';


var list = [
    {
        // imageurl: "https://i.imgur.com/dbNdLaS.jpg"
    }
]

export default class ComplexList extends Component {
    constructor(props) {
        super(props);


        this.setList()
  
        
       
        
    }
    setList(){
        list = []
        var response = this.props.serverResponse

        var maxLength = response.length
        if(response.length >= 2)
            maxLength = 1

        for(var i = 0; i < response.length; i++){
            console.log(i)
            list.push(
                {
                    "imageurl": response[i].imageurl
                }
            )


        }


    }

    render() {
        let styles = {
            image: {
                marginTop: 25,
                marginBottom: 5,
                height: "auto",
                width: 275,
              
                marginLeft: 7,
                borderRadius: 10,
            }
        }

        return (
            <ul>
            {list.map(item => (
              <img src={item.imageurl} style={styles.image}/>
            ))}
          </ul>
        )
    }
}
