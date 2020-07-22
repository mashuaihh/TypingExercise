import React, { Component } from "react";
import TypingArea from "./TypingArea";
import WritingMaterial from "./WritingMaterial";

export default class Exercise extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isTyping: false
    }
  }

  render() {
    return (
      <div style={typingAreaStyle}>
        <h2>Typing Exercise</h2>
        <WritingMaterial handleTextSelection={this.handleTextSelection} />
        {
          this.state.isTyping ?
          <React.Fragment>
            <TypingArea text={this.state.text} />
            <button onClick={this.handleClear}>Clear</button>
          </React.Fragment> :
          <React.Fragment>
            <div style={outerDivStyle}>
              <textarea style={textAreaStyle} value={this.state.text} onChange={this.handleChange} />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }

  handleTextSelection = (text) => {
    this.setState({
      text: text + ' ',
      isTyping: true
    });
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});  
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const stateText = this.state.text;
    this.setState({
      text: stateText.charAt(stateText.length - 1) === ' ' ? stateText : stateText + ' ',
      isTyping: true
    });
  }

  handleClear = (event) => {
    event.preventDefault();
    this.setState({
      isTyping: false
    });
  }
}

const typingAreaStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}
const outerDivStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
}
const textAreaStyle = {
  flex: '1',
  fontSize: '2em',
  borderWidth: 'medium',
  borderColor: 'black'
}