import { Component } from 'react';
import './App.css';
const axios = require('axios');

class App extends Component {
  constructor(props){
    super(props)
     this.state = {
      number_one: "",
      number_two: "",
      result: "",
      sum: [],
      substraction: [],
      multiply: [],
      division: []
    }

    this.setNumberOne = this.setNumberOne.bind(this)
    this.setNumberTwo = this.setNumberTwo.bind(this)
    this.getSum = this.getSum.bind(this)
    this.getSubtraction = this.getSubtraction.bind(this)
    this.getMultiply = this.getMultiply.bind(this)
    this.getDivision = this.getDivision.bind(this)
    this.deleteHistory = this.deleteHistory.bind(this)
  }
 
  

  componentDidMount() {
    axios.all([
      axios.get(`/backend/sum/`),
      axios.get(`/backend/substraction/`),
      axios.get(`/backend/multiply/`),
      axios.get(`/backend/division/`)]).then(axios.spread((...response) => {
        const responseOne = response[0].data
        const responseTwo = response[1].data
        const responseThree = response[2].data
        const responseFour = response[3].data

        this.setState({
          ...this.state,
          'sum': responseOne,
          'substraction': responseTwo,
          'multiply': responseThree,
          'division': responseFour
        })
      
      })).catch(error => {
        console.log(error)
      })
  }
    

  setNumberOne(ev) {
    if(/^\d*\.?\d*$/.test(ev.target.value)){
      this.setState({
        ...this.state,
        number_one: ev.target.value
      })
    }
  }

  setNumberTwo(ev) {
    if(/^\d*\.?\d*$/.test(ev.target.value)){
      this.setState({
        ...this.state,
        number_two: ev.target.value
      })
    }
  }

  getSum(){
    axios.post('/backend/', {
      operation: 'sum',
      number_one: this.state.number_one,
      sign: "+",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) + parseInt(this.state.number_two)
    })
    this.setState({
      ...this.state,
      result: parseInt(this.state.number_one) + parseInt(this.state.number_two)
    })
  }

  getSubtraction(){
    axios.post('/backend/', {
      operation: 'substraction',
      number_one: this.state.number_one,
      sign: "-",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) - parseInt(this.state.number_two)
    })
    this.setState({
      ...this.state,
      result: parseInt(this.state.number_one) - parseInt(this.state.number_two)
    })
  }

  getMultiply(){
    axios.post('/backend/', {
      operation: 'multiply',
      number_one: this.state.number_one,
      sign: "x",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) * parseInt(this.state.number_two)
    })
    this.setState({
      ...this.state,
      result: parseInt(this.state.number_one) * parseInt(this.state.number_two)
    })
  }

  getDivision(){
    axios.post('/backend/', {
      operation: 'division',
      number_one: this.state.number_one,
      sign: "/",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) / parseInt(this.state.number_two)
    })
    this.setState({
      ...this.state,
      result: parseInt(this.state.number_one) / parseInt(this.state.number_two)
    })
  }

  deleteHistory(id){
    console.log(id)
    axios.delete('/backend/', {id: id}).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <div className="App">
         <h1>Kalkulator</h1>
         <div className="Calculator">
           <input type="text" onChange={this.setNumberOne} value={this.state.number_one}/>
           <input type="text" onChange={this.setNumberTwo} value={this.state.number_two}/>
           <input className="equal" type="text" value={"= " + this.state.result} readOnly/>
           <input type="button" onClick={this.getSum} value="+" />
           <input type="button" onClick={this.getSubtraction} value="-" />
           <input type="button" onClick={this.getMultiply} value="x" />
           <input type="button" onClick={this.getDivision} value="/" />
         </div>
         <div className="History">
           <h2>Suma:</h2>
           {this.state.sum.map(item => 
            (<div>
              <p>{item.operation} : {item.number_one} {item.sign} {item.number_two} = {item.result}</p>
              <input type="button" value="Usuń" onClick={() => this.deleteHistory(item._id)}/>
            </div>))}
           
           <h2>Odejmowanie:</h2>
           {this.state.substraction.map(item => 
            (<div>
              <p>{item.operation} : {item.number_one} {item.sign} {item.number_two} = {item.result}</p>
              <input type="button" value="Usuń" onClick={() => this.deleteHistory(item._id)}/>
            </div>))}
           
           <h2>Mnożenie:</h2>
           {this.state.multiply.map(item => 
            (<div>
              <p>{item.operation} : {item.number_one} {item.sign} {item.number_two} = {item.result}</p>
              <input type="button" value="Usuń" onClick={() => this.deleteHistory(item._id)}/>
            </div>))}
           
           <h2>Dzielenie:</h2>
           {this.state.division.map(item =>
            (<div>
              <p>{item.operation} : {item.number_one} {item.sign} {item.number_two} = {item.result}</p>
              <input type="button" value="Usuń" onClick={() => this.deleteHistory(item._id)}/>
            </div>))}
         </div>
    </div>
    )
  }
}

export default App;
