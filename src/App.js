import React, { Component } from 'react';
import './App.css';
import Input from './Input';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      originalText1:"",
      originalText2:"",
      coloredText1:"",
      coloredText2:"",
      display:'none'
    }
  }
  handleChange = (event, str) =>{
    
    this.setState({[str]:event.target.value});
    
  }
  handleClick = () => {
   
    const bagOfLines1 = this.state.originalText1.split('\n');
    const bagOfLines2 = this.state.originalText2.split('\n');
   
    // result will be coloredText1 and coloredText2, that you will built!
    let coloredText1 = ``;
    let coloredText2 = ``;
    // they may, may not have same no of lines you have to deal with it!
    let lineIndex;
    for(lineIndex = 0; lineIndex < Math.min(bagOfLines1.length, bagOfLines2.length); lineIndex++){
      // deal with each line by breaking into words and subsequently building coloredText
      const bagOfWords1 = bagOfLines1[lineIndex].split(" ");
      const bagOfWords2 = bagOfLines2[lineIndex].split(" ");
     
      // this variable is to check whether span tag is open or not;
      let isOpen = false;
      // loop over the words 
      let wordIndex;
      // Again you have to deal with different lengths of array
      for(wordIndex = 0; wordIndex < Math.min(bagOfWords1.length, bagOfWords2.length); wordIndex++){
        if(bagOfWords1[wordIndex] !== bagOfWords2[wordIndex]){
            // open span if not already open
            if(!isOpen){
              // then open it
              coloredText1 += `<span class="Highlight">`;
              coloredText2 += `<span class="Highlight">`;
              isOpen = true;
            }
            coloredText1 = coloredText1 + bagOfWords1[wordIndex] + ' ';
            coloredText2 = coloredText2 + bagOfWords2[wordIndex] + ` `;
        }else{
          // if span is already open then you need to close it 
          if(isOpen){
            coloredText1 += `</span>`;
            coloredText2 += `</span>`;
            isOpen = false;
          }
          coloredText1 = coloredText1 + bagOfWords1[wordIndex] + ' ';
          coloredText2 = coloredText2 + bagOfWords2[wordIndex] + ` `;
        }
      }
      // check if isOpen is true
      // then close it 
      if(isOpen){
        coloredText1 += `</span>`;
        coloredText2 += `</span>`;
        isOpen = false;
      }
      coloredText1 += `<span class="Highlight">`;
      coloredText2 += `<span class="Highlight">`;
      while(wordIndex < bagOfWords1.length){
        coloredText1 = coloredText1 + bagOfWords1[wordIndex] + ' ';
        wordIndex++;
      }
      while(wordIndex < bagOfWords2.length){
        coloredText2 = coloredText2 + bagOfWords2[wordIndex] + ` `;
        wordIndex++;
      }
      coloredText1 += `</span>`;
      coloredText2 += `</span>`;
      // add line change 
      coloredText1 += `<br/>`;
      coloredText2 += `<br/>`

    }
    while(lineIndex < bagOfLines1.length){
      // deal with the left out line
      coloredText1 = coloredText1 + `<span class="Highlight">` + bagOfLines1[lineIndex] + `</span><br/>`;
      lineIndex++;
    }
    while(lineIndex < bagOfLines2.length){
      // deal with the left out line
      coloredText2 = coloredText2 + `<span class="Highlight">` + bagOfLines2[lineIndex] + `</span><br/>`;
      lineIndex++;
    }
    console.log(coloredText1);
    console.log(coloredText2);
    this.setState({display:'inline',coloredText1:coloredText1, coloredText2:coloredText2});
  }
  handleEdit = () => {
    this.setState({coloredText1:"",coloredText2:"", display:"none"});
  }
  render() {
    return (
      <div className="App" style = {{padding:'10px', overflow:'auto'}}>
        <h1>DIFFERENCE MADE EASY!</h1>
        <Input coloredText={this.state.coloredText1} originalText={this.state.originalText1} handleChange={this.handleChange} stateValue = "originalText1" floatRight={false}/>
        <Input coloredText={this.state.coloredText2} originalText={this.state.originalText2} handleChange={this.handleChange} stateValue = "originalText2" floatRight={true}/>
        <button type = "button" style = {{margin:'50px'}} onClick={this.handleClick}>Get Difference</button>
        <button style = {{display:this.state.display}} onClick={this.handleEdit} type="button">Edit</button>
      </div>
    );
  }
}

export default App;
