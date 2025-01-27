import React from 'react';

class Algorithms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arr: [] };
  }

  componentDidMount() {
    this.resetArr();
  }

  resetArr() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(this.randomNumbers(0, 9)); // Call `this.randomNumbers`
    }
    this.setState({ arr });
  }

  randomNumbers(lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1) + lowest);
  }

  display() {
    const { arr } = this.state;
    return (
      <div className="arr-container">
        {arr.map((value, index) => (
          <div
            className="arr-bar"
            key={index}
            style={{ height: `${value}px` }}
          >
            {value} {/* Display the number inside the bar */}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Array Visualization</h1>
        {this.display()} {/* Call the `display` method to render the array */}
      </div>
    );
  }
}

export default Algorithms;
