import React from "react";
// import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Welcome name="tao" />
    </div>
  );
}

class Welcome extends React.Component {
  constructor(props) {
    console.log("constructor", props);
    super(props);
    this.state = {
      date: new Date()
    };
    this.tick = this.tick.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props, state);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "shouldComponentUpdate(nextProps, nextState)",
      nextProps,
      nextState
    );
    if (this.props.name !== nextProps.name) {
      return true
    }
    if (this.state.date !== nextState.date) {
      return true
    }
    return false
  }
  componentDidMount() {
    console.log("componentDidMount ");
    this.timerID = setTimeout(() => {
      this.tick();
    }, 1000);
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    return null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
  }
  componentWillUnmount() {
    console.log("unmount ", arguments);

    clearTimeout(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    console.log("render");
    return (
      <>
        <h2>Hello, {this.props.name}</h2>
        <div>It is {this.state.date.toLocaleTimeString()}.</div>
        <button onClick={this.tick}>change</button>
      </>
    );
  }
}

export default App;
