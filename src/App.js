import React, { Component } from "react";
import "./App.css";
import Input from "./Input";

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			originalTextLeft:"",
			originalTextRight:"",
			isEditable:true
		};
	}
  
  /*
  The below function takes originalTextLeft and originalTextRight as input and returns 
  and highlightedTextLeft as output.
  Algorithm:
  Step 1: Break both strings into lines array
  Step 2: Loop over all the lines
  Step 3: Break both lines into words array
  Step 4: Loop over words and compare them if unequal add them inside <span> else outside <span>
  Step 5: isSpanOpen is used to group contiguous unequal words
  Step 6: Also considered edge cases such as unequal no. of lines or unequal no. of words in the given line (using while loop for it)
  */
  getHighlightedText = () => {
   
  	const bagOfLinesLeft = this.state.originalTextLeft.split("\n");
  	const bagOfLinesRight = this.state.originalTextRight.split("\n");
  	let textLeft = "";
  	let textRight = "";
  	let lineIndex;
  	for(lineIndex = 0; lineIndex < Math.min(bagOfLinesLeft.length, bagOfLinesRight.length); lineIndex++){
  		const bagOfWords1 = bagOfLinesLeft[lineIndex].split(" ");
  		const bagOfWords2 = bagOfLinesRight[lineIndex].split(" ");
  		let isSpanOpen = false;
  		let wordIndex;
  		for(wordIndex = 0; wordIndex < Math.min(bagOfWords1.length, bagOfWords2.length); wordIndex++){
  			if(bagOfWords1[wordIndex] !== bagOfWords2[wordIndex]){
  				if(!isSpanOpen){
  					textLeft = `${textLeft} <span class="Highlight">`;
  					textRight = `${textRight} <span class="Highlight">`;
  					isSpanOpen = true;
  				}
  				textLeft += bagOfWords1[wordIndex] + " ";
  				textRight += bagOfWords2[wordIndex] + " ";
  			}else{
  				if(isSpanOpen){
  					textLeft += "</span>";
  					textRight += "</span>";
  					isSpanOpen = false;
  				}
  				textLeft += bagOfWords1[wordIndex] + " ";
  				textRight += bagOfWords2[wordIndex] + " ";
  			}
  		}
  		if(isSpanOpen){
  			textLeft += "</span>";
  			textRight += "</span>";
  			isSpanOpen = false;
  		}
  		textLeft = `${textLeft} <span class="Highlight">`;
  		textRight = `${textRight} <span class="Highlight">`;
  		while(wordIndex < bagOfWords1.length){
  			textLeft += bagOfWords1[wordIndex] + " ";
  			wordIndex++;
  		}
  		while(wordIndex < bagOfWords2.length){
  			textRight += bagOfWords2[wordIndex] + " ";
  			wordIndex++;
  		}
  		textLeft += "</span>";
  		textRight += "</span>";
  		textLeft += "<br/>";
  		textRight += "<br/>";

  	}
  	while(lineIndex < bagOfLinesLeft.length){
  		textLeft = textLeft + "<span class=\"Highlight\">" + bagOfLinesLeft[lineIndex] + "</span><br/>";
  		lineIndex++;
  	}
  	while(lineIndex < bagOfLinesRight.length){
  		textRight = textRight + "<span class=\"Highlight\">" + bagOfLinesRight[lineIndex] + "</span><br/>";
  		lineIndex++;
  	}

  	return {"highlightedTextLeft":textLeft, "highlightedTextRight":textRight};
  }

  handleChange = (event, key) =>{
  	this.setState({[key]:event.target.value});
  }

  handleEdit = () => {
  	this.setState({isEditable:true});
  }

  handleGetDifference = () => {
  	if(this.state.originalTextLeft !== "" && this.state.originalTextRight !== ""){
  		this.setState({isEditable: false});
  	}
  }

  render() {
  	let {highlightedTextLeft, highlightedTextRight} = this.state.isEditable?
  		{"highlightedTextLeft":"","highlightedTextRight":""}:
  		this.getHighlightedText();
    
  	return (
  		<div className="App" style = {{padding:"10px", overflow:"auto"}}>
  			<h1>DIFFERENCE MADE EASY!</h1>
  			<Input 
  				highlightedText={highlightedTextLeft} 
  				originalText={this.state.originalTextLeft} 
  				handleChange={this.handleChange} 
  				floatRight={false}/>
  			<Input 
  				highlightedText={highlightedTextRight} 
  				originalText={this.state.originalTextRight} 
  				handleChange={this.handleChange} 
  				floatRight={true}/>
  			{ this.state.isEditable &&
          <button type = "button" onClick={this.handleGetDifference}>
            Get Difference
          </button>
  			}
  			{ this.state.isEditable === false &&
          <button type="button" onClick={this.handleEdit}>
            Edit
          </button>
  			}
  		</div>
  	);
  }
}

export default App;
