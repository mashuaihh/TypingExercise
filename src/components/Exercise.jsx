import React, { Component } from "react";
import TypingArea from "./TypingArea";

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
        {
          this.state.isTyping ?
          <React.Fragment>
            <TypingArea text={this.state.text} />
            <button onClick={this.handleClear}>Clear</button>
          </React.Fragment> :
          <React.Fragment>
            <textarea style={textAreaStyle} value={this.state.text} onChange={this.handleChange} />
            <button onClick={this.handleSubmit}>Submit</button>
          </React.Fragment>
        }
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});  
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    this.setState({
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
const textAreaStyle = {
  flex: '1',
  fontSize: '2em',
  borderWidth: 'medium',
  borderColor: 'black'
}