import React, { Component } from 'react';

let counter = 0;
let deletingTimeOut;
let mainTimeOut;

class PokeBubbleTextDesktop extends Component {
  static defProps = {
    textData: []
  }

  state = {
    text: '',
    deleting: false,
    loopNumber: 0,
    typerSpeed: 80,
  }

  componentDidMount() {
    this.typerHandler();
  }

  typerHandler = () => {
    const { textData } = this.props
    const { deleting, loopNumber, text, typerSpeed } = this.state
    const index = loopNumber % textData.length
    const fullText = textData[index]
    counter = counter + 1

    this.setState({
      text: deleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1), typerSpeed: deleting ? 20 : 80
    });

    mainTimeOut = setTimeout(this.typerHandler, typerSpeed);

    if (counter === this.props.stopCounter) {
      clearTimeout(mainTimeOut)
      clearTimeout(deletingTimeOut)
      counter = 0
    } else if (!deleting && text === fullText) {
      deletingTimeOut = setTimeout(() => this.setState({ deleting: true }), 700)
    } else if (deleting && text === '') {
      this.setState({
        deleting: false,
        loopNumber: loopNumber + 1
      });
    }

  };

  componentWillUnmount() {
    counter = 0
    clearTimeout(mainTimeOut)
    clearTimeout(deletingTimeOut)
  }

  render() {
    return (
      <div>
          <p>{this.state.text}</p>
      </div>
    )
  }
  
}

export default PokeBubbleTextDesktop;