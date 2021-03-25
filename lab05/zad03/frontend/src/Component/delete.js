import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {deleteProduct} from '../Actions/deleteProduct'
import {deleteAllProducts} from '../Actions/deleteAll'
import './delete.css'

class Delete extends Component {
    constructor(props){
        super(props)

        this.state = {
            take: [],
            deleteAll: false,
            delete: false
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteAll = this.handleDeleteAll.bind(this)
        this.handleProduct = this.handleProduct.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    handleDelete(){
        this.state.take.map(id => this.props.deleteProduct(id))
        this.setState({
            take: [],
            deleteAll: false,
            delete: true
        })

        setTimeout(() => {
            this.setState({...this.state,
                delete: false
            })
        }, 1000)
    }   

    handleDeleteAll(){
        let result = window.confirm("Do you want delete all data?")
        if (result === true){
            this.props.deleteAllProducts()
            this.setState({
                take: [],
                deleteAll: true,
                delete: false
            })

            setTimeout(() => {
                this.setState({...this.state,
                    deleteAll: false
                })
            }, 3000)

        }
    }

    handleProduct(id){
        if (this.state.take.includes(id)){
            this.setState({
                ...this.state,
                take: this.state.take.filter(item => item !== id)
            })
        }
        else{
            this.state.take.push(id)
        }
    }

    render(){
        const {data} = this.props.data

        return(
            <div>
                <div className="buttonDelete">
                    <input 
                        className="formButton"
                        type="button"
                        value="Return to main page"
                        onClick={() => this.props.history.push("/")}/>
                    <input
                        type="button"
                        value="Delete this products"
                        onClick={() => this.handleDelete()}/>
                    <input
                        type="button"
                        value="Delete all products"
                        onClick={() => this.handleDeleteAll()}/>
                </div>
                <div className="view">
                    {data.map(item => {
                        if (this.state.take.includes(item.id)){
                            return (
                                <div className="itemChecked" key={item.id} onClick={() => {this.handleProduct(item.id); this.props.getData()}}>
                                    <img src={item.image_link} alt={item.id} />
                                    <div className="text">
                                        <p className="brand">{item.brand}</p> 
                                        <p className="name">{item.name}</p>
                                        <p className="category">Category: {item.category}</p>
                                        <p className="price">{"$" + item.price}</p> 
                                    </div>
                                </div>)
                        }
                        else{
                            return (
                                <div className="item" key={item.id}onClick={() => {this.handleProduct(item.id); this.props.getData()}} >
                                    <img src={item.image_link} alt={item.id} />
                                    <div className="text">
                                        <p className="brand">{item.brand}</p> 
                                        <p className="name">{item.name}</p>
                                        <p className="category">Category: {item.category}</p>
                                        <p className="price">{"$" + item.price}</p> 
                                    </div>
                                </div>)
                        }
                    })}
                </div>
                {this.state.deleteAll && (
                        <div className="confirmDeleteAll"><p>You delete all data. Now you can start create your own products!</p></div>
                )}
                {this.state.delete && (
                    <div className="confirmDeleteAll"><p>Deleted!!!</p></div>
                )}
            </div>
        )
    }

}


const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData, deleteProduct, deleteAllProducts})(Delete)
