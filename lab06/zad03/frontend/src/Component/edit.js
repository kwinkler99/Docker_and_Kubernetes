import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getProduct} from '../Actions/getProduct'
import {getData} from '../Actions/getData'

class Edit extends Component {
    constructor(props){
        super(props)

        this.handleProduct = this.handleProduct.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    handleProduct(item){
        this.props.getProduct(item.id)
        this.props.history.push({
            'pathname': '/editproduct',
            'params': item
        })
        this.props.getData()
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
                </div>
                <div className="view">
                {data.map(item => 
                    <div className="item" key={item.id} onClick={() => this.handleProduct(item)}>
                        <img src={item.image_link} alt={item.id} />
                        <div className="text">
                            <p className="name">{item.name}</p> 
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    }

}


const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData, getProduct})(Edit)
