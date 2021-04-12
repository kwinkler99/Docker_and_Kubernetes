import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {newProduct} from '../Actions/newProduct'
import './form.css'

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


class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            addCorrect: false,
            product: prepare_product,
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
            validation: {
                name: false,
                description: false,
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.createInput = this.createInput.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handelAddComment = this.handelAddComment.bind(this)
        this.handleChangeComment = this.handleChangeComment.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    handleChange(ev, what){
        this.setState({
            ...this.state,
            product: {...this.state.product, [what]: ev}  
        })   
    }

    createInput(word, what, category){
        if(what !== 'product_colors' && what !== 'comments' ){
            return ((what !== 'description' && what !== 'id' && what !== 'active' && what !== 'name' && what !== 'image_link' && what !== 'product_types' && what !== 'category' &&
                <div key={what}>
                    <b>{word}</b><br/>
                    <input
                        type="text" 
                        onChange={(ev) => this.handleChange(ev.target.value, what)}
                        value={this.state.product[what]} /><br/>
                </div>
                ) || (what === 'description' &&
                <div key={what}>
                    {this.state.validation.description && (<p className="error">At least 100 letters in description</p>)}
                    <b>{word}</b><br/>
                    <textarea 
                        className="description"
                        onChange={(ev) => this.handleChange(ev.target.value, 'description')} 
                        value={this.state.product.description} /><br/>
                </div>
                ) || (what === 'name' && 
                <div key={what}>
                    {this.state.validation.name && (<p className="error">Name is required</p>)}
                    <b>{word}</b><br/>
                    <input
                        type="text"
                        onChange={(ev) => this.handleChange(ev.target.value, 'name')} 
                        value={this.state.product.name} /><br/>
                    
                </div>
                ) || (what === 'category' &&
                    <div key={what}>
                        <b>{word}</b><br/>
                        <select
                            onChange={(ev) => this.setState({...this.state,
                                product: {...this.state.product, category: ev.target.value}})}
                            value={this.state.product.category}>
                            {category.map(item => 
                                <option 
                                    key={item} 
                                    value={item}>
                                {item}
                                </option>
                            )}
                        </select>

                    </div>
                ))}   
    }
    

    handleDone(id){
        const product = this.state.product
        if(product.brand.length === 0){
            product.brand = "other"
        }
        if(product.price.length === 0){
            product.price = "0"
        }
        if(product.category.length === 0){
            product.category = "other"
        }
        this.setState({...this.state, product: {...product}})


        if(this.state.product.name.length === 0){
            if(this.state.product.description.split("").length < 100){
                this.setState({...this.state, 
                    validation: {
                        name: true,
                        description: true
                    }
                })
            }
            else{
                this.setState({...this.state, 
                    validation: {
                        name: true,
                        description: false
                    }
                })
            }
        }
        else if(this.state.product.description.split("").length < 100){
            this.setState({...this.state, 
                validation: {
                    name: false,
                    description: true
                }
            })
        }
        else{
            const filterComment = this.state.comments.filter(item => item.accept !== false)
            const new_product = this.state.product
            new_product['id'] = id + 1
            this.props.newProduct({...new_product, comments: filterComment})
            this.setState({
                ...this.state,
                addCorrect: true,
                product: prepare_product,
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
                validation: {
                    name: false,
                    description: false
                }
            })
            setTimeout(() => {
                this.setState({...this.state,
                    addCorrect: false
                })
            }, 2000)

            this.props.getData() 
        }
    }

    handleReset(){
        this.setState({
            addCorrect: false,
            product: prepare_product,
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
            validation: {
                name: false,
                description: false,
            }
        })
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
                        }
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

    render(){ 
        const {data, category} = this.props.data
        const keys = Object.keys(prepare_product)
        return(
            <div className="form">
                <input 
                        className="formButton"
                        type="button"
                        value="Return to main page"
                        onClick={() => this.props.history.push("/")}/>
                <div className="formEdit">
                    <div className="form-input">
                        {keys.map(item => {
                            return this.createInput(`${item}: `, item, category)
                        })}
                    </div>

                    <div className="allButton-form">
                        <input 
                            type="button"
                            value="Done"
                            onClick={() => this.handleDone(data.length > 0 ? data[0].id : 0)}/>
                        <input 
                            type="button"
                            value="Reset"
                            onClick={() => {this.handleReset()}}/>
                    </div>
                    <b>Comments</b>
                </div>
                <div className="img-buttton">
                    {this.state.product.image_link && (
                    <img className="imgDetails-form" src={this.state.product.image_link} alt={this.state.product.name} />)}
                </div>
                    {this.state.comments.map(comment => (
                        <div className="comment" key={comment.id}><br/>
                            {comment.validation.email && (<p className="error">Wrong email</p>)}
                            <input
                                className="emailComment" 
                                type="text"
                                value={comment.email}
                                onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'email', comment.id)}
                                placeholder="Email"/>
                            {comment.validation.content && (<p className="error">Empty content</p>)}
                            <textarea
                                placeholder="Content"
                                onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'content', comment.id)} 
                                value={comment.content}/>
                            {!comment.accept && (
                            <input 
                                className="addComment"
                                onClick={() => this.handelAddComment()}
                                type="button"
                                value="Add comment"/>)}
                        </div>
                    ))}
                    {this.state.addCorrect && (
                        <div className="confirmDeleteAll"><p>Add product correct. Great job!</p></div>
                    )}
                </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData, newProduct})(Form)
