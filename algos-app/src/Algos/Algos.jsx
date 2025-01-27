import React from 'react'
import './styles.css';

class Algorithms extends React.Component {
  constructor(nums) {
    super(nums);
    this.state = { arr: [], };
  }

  componentLoaded() {
    this.resetArr();
  }

  resetArr() {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push(this.randomNumbers(20, 250));
    }
    this.setState({ arr });
  }

  display() {
    const { arr } = this.state;
    return (
      <div className="arr-container">
        {arr.map((value, index) => (
          <div className="arr-bar" key = { index } style= {{ height: `${value}px`}}>
          </div>
        ))}
	<button className="new-array-btn" onClick={() => this.resetArr()}>New Array</button>
      </div>
    );
  }
}

function randomNumbers(lowest, highest) {
  return Math.floor(Math.random() * (highest - lowest + 1) + lowest);
}

export default Algorithms;
