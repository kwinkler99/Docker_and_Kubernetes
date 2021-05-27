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
    this.clear = this.clear.bind(this)
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
    const new_operation = {
      operation: 'sum',
      number_one: this.state.number_one,
      sign: "+",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) + parseInt(this.state.number_two)
    }

    if (this.state.number_one !== "" && this.state.number_two !== ""){
      axios.post('/backend/', new_operation)
        .then(res => {

          this.setState({
            ...this.state,
            sum: res.data.filter(item => item.operation === 'sum'),
            result: parseInt(this.state.number_one) + parseInt(this.state.number_two)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
   
  }

  getSubtraction(){
    const new_operation = {
      operation: 'substraction',
      number_one: this.state.number_one,
      sign: "-",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) - parseInt(this.state.number_two)
    }

    if (this.state.number_one !== "" && this.state.number_two !== ""){
      axios.post('/backend/', new_operation)
        .then(res => {
          this.setState({
            ...this.state,
            substraction: res.data.filter(item => item.operation === 'substraction'),
            result: parseInt(this.state.number_one) - parseInt(this.state.number_two)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  getMultiply(){
    const new_operation = {
      operation: 'multiply',
      number_one: this.state.number_one,
      sign: "x",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) * parseInt(this.state.number_two)
    }

    if (this.state.number_one !== "" && this.state.number_two !== ""){
      axios.post('/backend/', new_operation)
        .then(res => {
          this.setState({
            ...this.state,
            multiply: res.data.filter(item => item.operation === 'multiply'),
            result: parseInt(this.state.number_one) * parseInt(this.state.number_two)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  getDivision(){
    const new_operation = {
       operation: 'division',
      number_one: this.state.number_one,
      sign: "/",
      number_two: this.state.number_two,
      result: parseInt(this.state.number_one) / parseInt(this.state.number_two)
    }

    if (this.state.number_one !== "" && this.state.number_two !== ""){
      axios.post('/backend/', new_operation)
        .then(res => {
          this.setState({
            ...this.state,
            division: res.data.filter(item => item.operation === 'division'),
            result: parseInt(this.state.number_one) / parseInt(this.state.number_two)
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  deleteHistory(id, operation){
    axios.delete(`/backend/${id}`).then(response => {
      this.setState({
        ...this.state,
        [operation]: this.state[operation].filter(item => item._id !== id)
      })
    }).catch(error => {
      console.log(error)
    })
  }

  clear(){
    this.setState({
      ...this.state,
      number_one: "",
      number_two: "",
      result: ""
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
           <input type="button" onClick={this.clear} value="C" />
         </div>
         <div className="History">
           <h1>Historia wykonanych operacji:</h1>
           <h2>Suma:</h2>
           {this.state.sum.map(item => 
            (<div className="operation">
              <p>{item.operation} : <b>{item.number_one} {item.sign} {item.number_two} = {item.result}</b></p>
              <input className="delete" type="button" value="Usuń" onClick={() => this.deleteHistory(item._id, item.operation)}/>
            </div>))}
           
           <h2>Odejmowanie:</h2>
           {this.state.substraction.map(item => 
            (<div className="operation">
              <p>{item.operation} : <b>{item.number_one} {item.sign} {item.number_two} = {item.result}</b></p>
              <input className="delete" type="button" value="Usuń" onClick={() => this.deleteHistory(item._id, item.operation)}/>
            </div>))}
           
           <h2>Mnożenie:</h2>
           {this.state.multiply.map(item => 
            (<div className="operation">
              <p>{item.operation} : <b>{item.number_one} {item.sign} {item.number_two} = {item.result}</b></p>
              <input className="delete" type="button" value="Usuń" onClick={() => this.deleteHistory(item._id, item.operation)}/>
            </div>))}
           
           <h2>Dzielenie:</h2>
           {this.state.division.map(item =>
            (<div className="operation">
              <p>{item.operation} : <b>{item.number_one} {item.sign} {item.number_two} = {item.result}</b></p>
              <input className="delete" type="button" value="Usuń" onClick={() => this.deleteHistory(item._id, item.operation)}/>
            </div>))}
         </div>
         <footer>
           <a href="/form">Daj znać jak ci się podoba ta aplikacja!</a>
         </footer>
    </div>
    )
  }
}

export default App;
