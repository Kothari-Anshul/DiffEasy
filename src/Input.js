import React from "react";
var Input =  (props) => {
	const textareaStyle = {
		height:"350px",
		width:"49%",
		float:props.floatRight?"right":"left",
		padding:"5px",
		resize:"none",
		overflowY: "scroll",
		textAlign:"left"
	};
	if(props.highlightedText === ""){
		return (
			<textarea 
				defaultValue={props.originalText} 
				style={textareaStyle} 
				onChange = {(event) => props.handleChange(event,props.floatRight?"originalTextRight":"originalTextLeft")} 
				placeholder = "Please enter some text!">
			</textarea>
		);
		
	}else{
		return (
			<div style={textareaStyle} dangerouslySetInnerHTML={{__html:props.highlightedText}}>
			</div>
		);
	}
};
export default Input;