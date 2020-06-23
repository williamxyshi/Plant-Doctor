import React, { Component } from 'react';


var list = [
    {
        comment: "https://i.imgur.com/dbNdLaS.jpg"
    }
]

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {

            clickedTag : ""

        }


        this.setList()
  
        
       
        
    }
    setList(){
        var tag = this.props.clickedTag

        list = []
        var response = this.props.serverResponse


        for(var i = 0; i < response.length; i++){
            
            for(var j=0; j<response[i].comments.length; j++){

                var comment = response[i].comments[j]
                if(comment.tags.includes(this.props.clickedTag)){
                    list.push(
                        {
                            "comment": comment.comment,
                            "link": "http://reddit.com" + comment.link
                        }
                    )
                }



            }


        }


        if(list.length == 0){

            list.push(
                {
                    "comment": "Click on a slice to view more details"
                }
            )

        }

       


    }

    componentDidUpdate(prevProps){
        console.log("post" + this.props.clickedTag)

        if(prevProps !== this.props){
            this.setState({
                clickedTag : this.props.clickedTag
            })
    
            this.setList()
        }
  

        console.log(list)
    }


    render() {
        let styles = {
            image: {
                marginRight: 25,
                marginTop: 20,
                marginBottom: 5,
                background:"#000",
                padding: 10,
                borderRadius: 15,
            
                color: "#CAD2C5",
            }
        }

        return (
        <ul>
            {list.map(item => (
                <a href={item.link}>
                    <div style = {styles.image}>{item.comment}</div>
                </a>
            ))}
        </ul>
        )
    }
}
