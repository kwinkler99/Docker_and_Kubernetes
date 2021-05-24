import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
const axios = require('axios');

class App extends Component {
  state = {
    info: ""
  }

  componentDidMount() {
    axios.get(`http://192.168.99.100:31000/api`)
      .then(res => {
        const info = res.data;
        this.setState({ 'info': info });
      })
  }

  render() {
    return(
      <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload. 
           Info about backend: {this.state.info}
         </p>
         <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    )
  }
}

export default App;
