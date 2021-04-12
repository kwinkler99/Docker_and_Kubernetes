import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {editDone} from '../Actions/editDoneProduct'

import './details.css'


class Details extends Component {

    render(){
        const {product} = this.props.data

        return (
            <div className="detailsPage">
                <input 
                    className="return"
                    type="button" 
                    value="Return to main page" 
                    onClick={() => this.props.history.push("/")}/>
                <div className="product">
                    <img src={product.image_link} alt={product.id} />
                    <div className="textAlign">
                        <b>Name: </b>
                        <p className="textDetails">{product.name}</p>
                        <b>Brand: </b>
                        <p className="textDetails">{product.brand}</p>
                        <b>Price: </b>
                        <p className="textDetails">{product.price}</p>
                        <b>Currency: </b>
                        <p className="textDetails">{product.currency}</p>
                        <b>Description: </b>
                        <p className="textDetails">{product.description}</p>
                        <b>Category: </b>
                        <p className="textDetails">{product.category}</p>
                        <b>Type: </b>
                        <p className="textDetails">{product.product_types}</p>
                        <b>Tags: </b>
                        <p className="textDetails">{product.tag_list}</p>
                        <b>Comments</b><br/>
                        {product.comments && product.comments.map(comment => (
                            <div className="commentDetails" key={comment.id}>
                                <br/>
                                <b>{comment.email}:</b>
                                <p>{comment.content}</p><br/>
                            </div>
                        ))}                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.product,
})

export default connect(mapStateToProps, {editDone})(Details)
