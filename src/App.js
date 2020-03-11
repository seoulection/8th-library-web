import React from 'react';
import getHelloWorldMessage from './api/HelloAPI';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentDidMount() {
    this.setHelloWorldMessage();
  }

  setHelloWorldMessage = async () => {
    try {
      const response = await getHelloWorldMessage();
      this.setState({ message: response.data.message });
    } catch(err) {
      this.setState({ message: err.message });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
