import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {editDone} from '../Actions/editDoneProduct'
import {getProduct} from '../Actions/getProduct'
import './editProduct.css'

const prepare_product = {
    id: "new",
    name: "",
    brand: "",
    price: "0",
    currency: "",
    image_link: "",
    description: "",
    category: "",
    product_types: "",
    product_colors: [],
    tag_list: "",
    active: "",
    comments: []
}

class EditProduct extends Component {
    constructor(props){
        super(props)

        this.state = {
            item: prepare_product,
            comments: [
                {
                    id: 0,
                    accept: false,
                    email: "",
                    content: "",
                    validation: {
                        email: false,
                        content: false
                    }
                }
            ],
            edit: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.createInput = this.createInput.bind(this)
        this.handelAddComment = this.handelAddComment.bind(this)
        this.handleChangeComment = this.handleChangeComment.bind(this)
        this.handelDeleteComment = this.handelDeleteComment.bind(this)
    }

    componentDidMount() {
        const params = this.props.history.location.params
        if (params){
            this.setState({
                item: params,
                comments: [...params.comments,
                    {
                        id: params.comments.length,
                        accept: false,
                        email: "",
                        content: "",
                        validation: {
                            email: false,
                            content: false
                        }
                    }
                ],
                edit: false
            })
        }
    }

    handleChange(ev, what){
        this.setState({
            item: {...this.state.item, [what]: ev}  
        })   
    }

    handleDone(){
        const update = this.state.comments.filter(comment => comment.accept === true)
        this.props.editDone(this.state.item.id, {...this.state.item, comments: update})
        this.props.history.push("/edit")
    }

    createInput(what){
        return (
            <input 
                type="text" 
                onChange={(ev) => this.handleChange(ev.target.value, what)}
                value={this.state.item[what]} />)
    }

    handelAddComment(){
        const re = /\S+@\S+\.\S+/
        const id = this.state.comments[this.state.comments.length - 1].id + 1
        const com = this.state.comments
        if(!re.test(this.state.comments[id - 1].email)){
            if(this.state.comments[id - 1].content.length === 0){
                com[this.state.comments.length - 1].validation.email = true
                com[this.state.comments.length - 1].validation.content = true
                this.setState({...this.state, 
                    comments: com
                })
            }
            else{
                com[this.state.comments.length - 1].validation.email = true
                com[this.state.comments.length - 1].validation.content = false

                this.setState({...this.state, 
                    comments: com
                })
            }
        }
        else if(this.state.comments[id - 1].content.length === 0){
            com[this.state.comments.length - 1].validation.email = false
            com[this.state.comments.length - 1].validation.content = true

            this.setState({...this.state, 
                comments: com
            })
        }
        else{ 
            const upload = this.state.comments.map(item => {
                if(item.id === id - 1){
                    item.accept = true;
                    item.validation.email = false;
                    item.validation.content = false;
                    return item
                }
                return item
            })
            this.props.editDone(this.state.item.id, {...this.state.item, comments: upload})

            this.setState({
                ...this.state, 
                comments: [
                    ...upload,
                    {
                        id: id,
                        accept: false,
                        email: "",
                        content: "",
                        validation: {
                            email: false,
                            content: false
                        },
                        edit: false
                    }
                ]
            })  
        }
    }

    handleChangeComment(ev, what, id){
        const upload = this.state.comments.map(item => {
            if (item.id === id){
                return {...item, [what]: ev}
            }
            else{
                return item
            }
        })
        this.setState({
            ...this.state,
            comments: upload  
        })   
    }

    handelDeleteComment(id){
        const update = this.state.comments.filter(item => item.id !== id)
        let index = -1
        const result = update.map(com => {
            index = index + 1
            return {...com, id: index}
        })
        this.props.editDone(this.state.item.id, {...this.state.item, comments: result})

        this.setState({
            ...this.state,
            comments: result
        })
        
    }

    render(){
        return (
            <div className="editProduct">
                <input 
                    className="return"
                    type="button" 
                    value="Return to edit page" 
                    onClick={() => this.props.history.push("/edit")}/>
                <div className="product">
                    <img className="imgDetails" src={this.state.item.image_link} alt={this.state.item.id} />
                        <div className="textAlign">
                            <b>Name: </b><br/>
                            {this.createInput('name')}<br/>
                            <b>Brand: </b><br/>
                            {this.createInput('brand')}<br/>
                            <b>Price: </b><br/>
                            {this.createInput('price')}<br/>
                            <b>Currency: </b>
                            <p className="textDetails">{this.state.item.currency}</p>
                            <b>Description: </b><br/>
                            <textarea 
                                className="description"
                                onChange={(ev) => this.handleChange(ev.target.value, 'description')} 
                                value={this.state.item.description} /><br/>
                            <b>Category: </b><br/>
                            {this.createInput('category')}<br/>
                            <b>Type: </b><br/>
                            {this.createInput('product_types')}<br/>
                            <b>Tags: </b>
                            <p className="textDetails">{this.state.item.tag_list}</p>
                            <input type="button" onClick={() => this.handleDone()} value="Done"/>         
                            <b>Komentarze</b>
                            {this.state.comments.map(comment => (
                            <div className="comment" key={comment.id}>
                                {comment.validation.email && (<p className="error">Wrong email</p>)}
                                <input
                                    className="emailComment" 
                                    type="text"
                                    value={comment.email}
                                    onChange={(ev) => (!comment.accept || comment.edit) && this.handleChangeComment(ev.target.value, 'email', comment.id)}
                                    placeholder="Email"/>
                                {comment.validation.content && (<p className="error">Empty content</p>)}
                                <textarea
                                    placeholder="Content"
                                    onChange={(ev) => (!comment.accept || comment.edit) && this.handleChangeComment(ev.target.value, 'content', comment.id)} 
                                    value={comment.content}/>
                                {!this.state.edit ? (
                                    <div>
                                        {!comment.accept ? (
                                            <input 
                                                className="addComment"
                                                onClick={() => this.handelAddComment()}
                                                type="button"
                                                value="Add comment"/>)
                                        :
                                        (
                                            <div>
                                                <input 
                                                    className="addComment"
                                                    onClick={() => {comment.edit = true ;this.setState({...this.state, edit: true})}}
                                                    type="button"
                                                    value="Edit comment"/>
                                                <input 
                                                    className="addComment"
                                                    onClick={() => this.handelDeleteComment(comment.id)}
                                                    type="button"
                                                    value="Delete comment"/>
                                            </div>
                                        )}
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        {comment.edit && (                      
                                            <input 
                                                className="addComment"
                                                onClick={() => {
                                                    comment.edit = false; 
                                                    this.props.editDone(this.state.item.id, {...this.state.item, comments: this.state.comments.filter(item => item.accept === true)})       
                                                    this.setState({...this.state, edit: false})}}
                                                type="button"
                                                value="Done"/>
                                        )}
                                    </div>
                                )}
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

export default connect(mapStateToProps, {editDone, getProduct})(EditProduct)
