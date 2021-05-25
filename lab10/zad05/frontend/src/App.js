import { Component } from 'react';
const axios = require('axios');

class App extends Component {
  state = {
    info: ""
  }

  componentDidMount() {
    axios.get(`http://backend-service:5000/api`)
      .then(res => {
        const info = res.data;
        this.setState({ 'info': info });
      })
  }

  render() {
    return(
      <div className="App">
         <p>
           Edit <code>src/App.js</code> and save to reload. 
           Info about backend: {this.state.info}
         </p>
    </div>
    )
  }
}

export default App;
