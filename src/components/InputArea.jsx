import React, { Component } from "react";
import TypingArea from "./TypingArea";

export default class InputArea extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isTyping: false
    }
  }

  render() {
    return (
      this.state.isTyping ?
      <div>
        <TypingArea text={this.state.text} />
        <button onClick={this.handleClear}>Clear</button>
      </div> :
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.text} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
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