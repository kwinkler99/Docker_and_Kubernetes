import { Component } from 'react';
import './Form.css'
const axios = require('axios');

class Form extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: "",
            surname: "",
            text: "",
            fill: false,
            warning: "",
            search: false,
            update: false
        }
        
        this.setName = this.setName.bind(this)
        this.setSurname = this.setSurname.bind(this)
        this.setText = this.setText.bind(this)
        this.sendForm = this.sendForm.bind(this)
        this.newForm = this.newForm.bind(this)
        this.updateForm = this.updateForm.bind(this)
        this.searchForm = this.searchForm.bind(this)
        this.deleteForm = this.deleteForm.bind(this)

    }

    setName(ev){
        this.setState({
            ...this.state,
            name: ev.target.value
        })
    }

    setSurname(ev){
        this.setState({
            ...this.state,
            surname: ev.target.value
        })
    }

    setText(ev){
        this.setState({
            ...this.state,
            text: ev.target.value
        })
    }

    sendForm(){
        const new_form = {
            name: this.state.name,
            surname: this.state.surname,
            text: this.state.text,
        }
        if(!this.state.update){
            if(this.state.name !== "" && this.state.surname !== "" && this.state.text !== ""){
                axios.post('/backend/form', new_form)
                    .then(res => {
                        if(res.data.correct === true){
                            this.setState({
                                ...this.state,
                                warning: "",
                                fill: true
                            })
                        } else {
                            this.setState({
                                ...this.state,
                                warning: res.data.warning
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else if (this.state.text === ""){
                this.setState({
                    ...this.state,
                    warning: "Wypełnij wszystkie pola powyżej :)"
                })
            }
        } else {
            if(this.state.text !== ""){
                axios.put('/backend/form', new_form)
                    .then(res => {
                        this.setState({
                            ...this.state,
                            warning: "",
                            fill: true,
                            update: false
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else if (this.state.text === ""){
                this.setState({
                    ...this.state,
                    warning: "Wypełnij pole powyżej :)"
                })
            }
        }
    }

    newForm(){
        this.setState({
            name: "",
            surname: "",
            text: "",
            warning: "",
            fill: false,
            search: false,
            update: false
        })
    }

    updateForm(){
        this.setState({
            name: "",
            surname: "",
            text: "",
            warning: "",
            fill: false,
            search: true,
            update: false
        })
    }

    searchForm(){
        if(this.state.name !== "" && this.state.surname !== "") {
            const key = this.state.name + this.state.surname
            axios.get(`/backend/form/${key}`)
                .then(res => {
                    if(res.data.correct === true){
                        this.setState({
                            ...this.state,
                            ...res.data.find,
                            warning: "",
                            search: false,
                            fill: false,
                            update: true
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            warning: res.data.warning
                        })
                    }
                })
                .catch(error => {
                console.log(error)
                })
        } else {
            this.setState({
                ...this.state,
                warning: "Wpisz imie i nazwisko"
            })
        }
    }

    deleteForm(){
        const key = this.state.name + this.state.surname
        axios.delete(`/backend/form/${key}`)
            .then(res => {
                this.setState({
                    name: "",
                    surname: "",
                    text: "",
                    warning: "Użytkownik został usunięty",
                    fill: false,
                    search: false,
                    update: false
                })
            })
            .catch(error => {
            console.log(error)
            })
    }

    render() {
        return(
            <div className="Form">
                <h1>Formularz</h1>
                <div className="form-input" >
                {!this.state.search ? (
                    <div>
                        <fieldset disabled={this.state.fill}>
                            <div className="basic">
                                <h3>Imię:</h3>
                                <input type="text" value={this.state.name} onChange={this.setName} readOnly={this.state.update}/>
                                <h3>Nazwisko:</h3>
                                <input type="text" value={this.state.surname} onChange={this.setSurname} readOnly={this.state.update}/>
                            </div>
                            <textarea value={this.state.text} onChange={this.setText} placeholder="Daj znać jak oceniasz kalkulator!"/>
                            <h3 className="warning">{this.state.warning}</h3>
                            {this.state.update && (
                                <input type="button" value="Usuń swoją ankietę" onClick={this.deleteForm} />
                            )}
                            <input type="button" value="Zatwierdż" onClick={this.sendForm} />
                        </fieldset>
                        <input type="button" value="Wypełnij nową ankietę" onClick={this.newForm}/>
                        {!this.state.update && (<input type="button" value="Zaktualizuj swoją ankietę" onClick={this.updateForm}/>)}
                    </div>)
                :
                (
                    <div className="form-input">
                        <h3>Podaj swoje imię:</h3>
                        <input type="text" value={this.state.name} onChange={this.setName}/>
                        <h3>Podaj swoje nazwisko:</h3>
                        <input type="text" value={this.state.surname} onChange={this.setSurname}/>
                        <h3 className="warning">{this.state.warning}</h3>
                        <input type="button" value="Szukaj" onClick={this.searchForm}/>
                        <input type="button" value="Wypełnij nową ankietę" onClick={this.newForm}/>
                    </div>
                )}
                </div>
                <footer>
                    <a href="/">Powrót do kalkulatora</a>
                </footer>
            </div>
        )
    }
}

export default Form;
