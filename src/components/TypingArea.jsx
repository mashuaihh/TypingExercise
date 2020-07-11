import React, { Component } from "react";
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default class TypingArea extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  componentDidUpdate() {
    if (this.props.text.length === 0) {
      return;
    }
    if (this.state.currentIndex === this.props.text.length) {
      this.setState({
        currentIndex: 0
      });
    }
  }

  render() {
    if (!this.props.text) {
      return (
        <h2>Empty string</h2>
      );
    }

    const spans = Array.from(this.props.text).map((char, index) =>
      index < this.state.currentIndex ?
      <span key={index} style={afterStyle}>
        {char}
      </span> :
      <span key={index} style={beforeStyle}>
        {char}
      </span>
    );

    return (
      <div>
        {spans}
        <KeyboardEventHandler
          handleKeys={keys}
          onKeyEvent={this.keyPressHandler} />
      </div>
    );
  }

  // key can be 'a' or 'shitf+a'
  keyPressHandler = (key) => {
    if (key === 'shift+quote') {
      key = '"';
    } else if (key === 'space') { 
      key = ' ';
    } else {
      key = key.startsWith('shift') ? key.charAt(key.length - 1).toUpperCase() : key;
    }
    const text = this.props.text;
    if (key === text.charAt(this.state.currentIndex)) {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }
  }
}

const keys = (() => {
  const letters = Array.from('abcdefghijklmnopqrstuvwxyz');
  return letters.reduce(
    (keys, currentLetter) => keys.concat([currentLetter, `shift+${currentLetter}`]),
    [',', 'space', '.', 'shift+quote', 'quote']
  );
})();

const beforeStyle = {
  color: 'grey',
  fontWeight: 'bold',
  fontSize: '2em',
}
const afterStyle = {
  color: 'black',
  fontWeight: 'bold',
  fontSize: '2em',
}