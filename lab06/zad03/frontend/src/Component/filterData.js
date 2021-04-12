import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {sortData} from '../Actions/sortData'
import './filterData.css' 


const select = ["Sortuj od A do Z", "Sortuj od Z do A", "Sortuj przez cenę"]



class FilterData extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: "",
            sort: "Sortuj od A do Z",
            check: [],
            from: 0,
            to: null
        }

        this.handleText = this.handleText.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleText(event){
        this.setState({
            ...this.state,
            text: event
        })
    }

    handleSort(event){
         this.setState({
            ...this.state,
            sort: event
        })
    }

    handleCheck(event){
        function functionCheck(value) {
            return value !== event.value;
        }
        if(event.value === "all" && event.checked === true){
            this.setState({
                ...this.state,
                check: this.props.data.category
            });
        }
        else if(event.value === "all"){
            this.setState({
                ...this.state,
                check: []
            });
        }
        else if(event.checked === true){
            this.setState({
                ...this.state,
                check: [...this.state.check, event.value]
            });
        }
        else{
            this.setState({
                ...this.state,
                check: this.state.check.filter(functionCheck)
            });
        }
    }

    handleFrom(event){
        this.setState({
            ...this.state,
            from: event
        })
    }

    handleTo(event){
        this.setState({
            ...this.state,
            to: event
        })
    }

    handleDone(){
        const {text, sort, check, to, from} = this.state
        const {price} = this.props.data
        this.props.sortData(text, sort, check, to || price, from)
    }

    handleReset(){
        this.props.getData()
        const {price} = this.props.data
        this.setState({
            text: "",
            sort: "Sortuj od A do Z",
            check: [],
            from: 0,
            to: price
        })
    }

    render() {
        const {category, price} = this.props.data

        return(
            <div className="filter">
                <div className="title">Filter data</div>
                <div>
                    <input 
                        type="text" 
                        value={this.state.text} 
                        onChange={(ev) => this.handleText(ev.target.value)} 
                        placeholder="Type product name" /> 
                    <select 
                        onChange={(ev) => this.handleSort(ev.target.value)} 
                        value={this.state.sort}>
                        {select.map(item => 
                            <option 
                                key={item} 
                                value={item}>
                            {item}</option>
                            )}

                    </select>
                </div>
                <div>
                    {category
                        .map(item => (
                            <div key={item}>
                                <label>{item}</label>
                                <input 
                                    checked={this.state.check.includes(item)}
                                    type = "checkbox" 
                                    value = {item} 
                                    onChange={(ev) => this.handleCheck(ev.target)}
                                />
                            </div>
                        )
                    )} 
                </div>
                <div>
                    <p>Cena od: </p>
                    <input
                        type="number"
                        value={this.state.from}
                        onChange={(ev) => this.handleFrom(ev.target.value)}/>
                
                    <p>Cena do: </p>
                    <input
                        type="number"
                        value={this.state.to === null ? price : this.state.to}
                        onChange={(ev) => this.handleTo(ev.target.value)}/><br/>
                    <input
                        type="button"
                        value="Done"
                        onClick={() => this.handleDone()}/> 
                    <input
                        type="button"
                        value="Reset"
                        onClick={() => this.handleReset()}/>
                </div>  
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {sortData, getData})(FilterData)
