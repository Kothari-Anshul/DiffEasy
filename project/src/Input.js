import React, { Component } from 'react';
class Input extends Component{
    
    render(){
        let float = "left";
        if(this.props.floatRight){
            float = "right";
        }
        const textareaStyle = {
            height:"350px",
            width:"49%",
            float:float,
            padding:'5px',
            resize:'none',
            overflowY: 'scroll',
            textAlign:'left'
        }
        if(this.props.coloredText !== ""){
            console.log(typeof this.props.coloredText);
            return (
                <div style={textareaStyle} dangerouslySetInnerHTML={{__html:this.props.coloredText}}>
                </div>
            );
        }else{
            return (
                <textarea defaultValue={this.props.originalText} style={textareaStyle} onChange = {(event) => this.props.handleChange(event,this.props.stateValue)} placeholder = "Please enter some text!"></textarea>
            );
        }
    }
}
export default Input;