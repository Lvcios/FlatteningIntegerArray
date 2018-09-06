import React from "react";
//import { flat, validateArray } from "./FlatArray";

function flat(input, output) {
  if (typeof input === "number") {
    output.push(input);
    return;
  } else {
    input.forEach(function(item, index) {
      flat(item, output);
    });
  }
}

function validateArray(input) {
  try {
    input = JSON.parse(input);
    return {
      isValid: true,
      input: input
    };
  } catch (err) {
    return {
      isValid: false,
      message: "ERROR: " + err.message
    };
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flatResult: [],
      input: "",
      expected: ""
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    let inputValue = event.target.value;
    let expected = inputValue.replace(/\[/g, "");
    expected = expected.replace(/\]/g, "");
    expected = expected.replace(/ /g, "");
    this.setState({
      input: event.target.value,
      expected: expected
    });
  }

  submitForm(event) {
    event.preventDefault();
    let input = this.state.input;
    let result = [];
    let validation = validateArray(input);
    input = validation.input;
    console.log(validation);
    if (validation.isValid) {
      flat(input, result);
    } else {
      result = validation.message;
    }

    this.setState({
      flatResult: result
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Flattening an integer array</h1>
        <form onSubmit={this.submitForm}>
          <input
            value={this.state.input}
            placeholder="Introduce an array of integers"
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <button type="submit">Flat it!</button>
        </form>
        <div>
          <h3>Results:</h3>
          <p>Input: {this.state.input}</p>
          <p>Expected: [{this.state.expected}]</p>
          <p>Output:[{this.state.flatResult.toString()}]</p>
        </div>
      </div>
    );
  }
}
export default App;
