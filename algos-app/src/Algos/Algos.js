import React from 'react';
import './styles.css'

class Algorithms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      originalArr: [], // Store initial array
      isRunning: false,
      isSorted: false,
      currentAlgorithm: '',
      timings: {
        bubble: null,
        quick: null,
        insertion: null,
        selection: null,
        merge: null
      }
    };
  }

  componentDidMount() {
    this.resetArr();
  }

  resetArr() {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push(this.randomNumbers(20, 250));
    }
    this.setState({
      arr,
      originalArr: [...arr],
      isSorted: false,
      timings: {
        bubble: null,
        quick: null,
        insertion: null,
        selection: null,
        merge: null
      }
    });
  }

  restoreOriginalArr() {
    this.setState({
      arr: [...this.state.originalArr],
      isSorted: false
    });
  }

  randomNumbers(lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1) + lowest);
  }

  async runAlgorithm(algorithmName, sortFunction) {
    if (this.state.isRunning || this.state.isSorted) return;

    this.setState({ isRunning: true, currentAlgorithm: algorithmName });
    const startTime = performance.now();

    await sortFunction();

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);

    this.setState(prevState => ({
      isRunning: false,
      isSorted: true,
      timings: {
        ...prevState.timings,
        [algorithmName]: timeTaken
      }
    }));
  }

  async bubbleSort() {
    await this.runAlgorithm('bubble', async () => {
      const arr = [...this.state.arr];
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            this.setState({ arr: [...arr] });
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
      }
    });
  }

  async insertionSort() {
    await this.runAlgorithm('insertion', async () => {
      const arr = [...this.state.arr];
      const n = arr.length;

      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j = j - 1;
          this.setState({ arr: [...arr] });
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        arr[j + 1] = key;
        this.setState({ arr: [...arr] });
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    });
  }

  async selectionSort() {
    await this.runAlgorithm('selection', async () => {
      const arr = [...this.state.arr];
      const n = arr.length;

      for (let i = 0; i < n-1; i++) {
        let minIdx = i;
        for (let j = i+1; j < n; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        let temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
        this.setState({ arr: [...arr] });
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    });
  }

  async mergeSort() {
    await this.runAlgorithm('merge', async () => {
      const arr = [...this.state.arr];
      await this.mergeSortHelper(arr, 0, arr.length - 1);
    });
  }

  async mergeSortHelper(arr, l, r) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);
    await this.mergeSortHelper(arr, l, m);
    await this.mergeSortHelper(arr, m + 1, r);
    await this.merge(arr, l, m, r);
  }

  async merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      this.setState({ arr: [...arr] });
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      this.setState({ arr: [...arr] });
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      this.setState({ arr: [...arr] });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  async quickSort() {
    await this.runAlgorithm('quick', async () => {
      const arr = [...this.state.arr];
      await this.quickSortHelper(arr, 0, arr.length - 1);
    });
  }

  async quickSortHelper(arr, low, high) {
    if (low < high) {
      const pivot = await this.partition(arr, low, high);
      await this.quickSortHelper(arr, low, pivot - 1);
      await this.quickSortHelper(arr, pivot + 1, high);
   }
  }
  
  async partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        this.setState({ arr: [...arr] });
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    this.setState({ arr: [...arr] });
    await new Promise(resolve => setTimeout(resolve, 50));
    return i + 1;
  }

  display() {
    const { arr, isRunning, isSorted, timings } = this.state;

    // Sort timings from fastest to slowest
    const sortedTimings = Object.entries(timings)
      .filter(([_, time]) => time !== null)
      .sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    return (
      <div className="arr-container">
        <div className="visualization-container">
          {arr.map((value, index) => (
            <div
              className="arr-bar"
              key={index}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
          ))}
        </div>

        <div className="control-panel">
          <div className="timing-panel">
            <h3>Execution Times (ms)</h3>
            {Object.entries(sortedTimings).map(([algo, time]) => (
              <div key={algo} className="timing-entry">
                <span>{algo.charAt(0).toUpperCase() + algo.slice(1)}</span>
                <span>{Number(time).toFixed(2)}ms</span>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button
              className="new-array-btn"
              onClick={() => this.resetArr()}
              disabled={isRunning}
            >
              New Array
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.restoreOriginalArr()}
              disabled={isRunning || !isSorted}
            >
              Reset Array
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.bubbleSort()}
              disabled={isRunning || isSorted}
            >
              Bubble Sort
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.quickSort()}
              disabled={isRunning || isSorted}
            >
              Quick Sort
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.insertionSort()}
              disabled={isRunning || isSorted}
            >
              Insertion Sort
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.selectionSort()}
              disabled={isRunning || isSorted}
            >
              Selection Sort
            </button>

            <button
              className="new-array-btn"
              onClick={() => this.mergeSort()}
              disabled={isRunning || isSorted}
            >
              Merge Sort
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Array Visualization</h1>
        {this.display()}
      </div>
    );
  }
}

export default Algorithms;
