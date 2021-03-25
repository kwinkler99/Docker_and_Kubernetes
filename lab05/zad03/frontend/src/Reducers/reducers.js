import { combineReducers } from 'redux'


const initialState = {
    data:[],
    category: [],
    price: 0
}

function arrangement(data){
    const response = data.map(item => {
        const {id, brand, name, price, currency, image_link, description, category, product_types, product_colors, tag_list, active, comments} = item
        
        //unique colors
        const result = Array.from(new Set(product_colors.map(s => s.colour_name)))
            .map(colour_name => {
                return {
                    colour_name: colour_name,
                    hex_value: product_colors.find(s => s.colour_name === colour_name).hex_value
                }
            });
        
        //save product
        const product = {
            id: id,
            brand: brand,
            name: name,
            price: parseFloat(price) || 0,
            currency: currency || 'other',
            image_link: image_link,
            description: description,
            category: category || "others",
            product_types: product_types || "others",
            product_colors: result,
            tag_list: tag_list,
            active: active,
            comments: comments
        }
        return product
    })
    return response
}

function takeCategory(data){
    const category = [...new Set(data.map((item) => item.category))].filter(
        (i) => i
    )
    return [...category, "all"]
}

const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};



const products = (state = initialState, action) => {
    switch (action.type){
        case 'GET_DATA':
            return {
                ...state,
                data: arrangement(action.payload),
                category: takeCategory(action.payload),
                price: Math.max(...action.payload.map(item => item.price))
            }

        case 'SORT_DATA':
            const data = arrangement(action.payload)
            const filterByText = data.filter(item => item.name.toLowerCase().startsWith(action.meta.text.toLowerCase()))
            const filterByCategory = filterByText.filter(item => item.category.startsWith(...action.meta.check.filter(a => a === item.category))) 
            let sortData = []
            if(action.meta.sort === "reverse"){
                sortData = filterByCategory.concat().sort(sortBy(["name"])).reverse()
            }
            else{
                sortData = filterByCategory.concat().sort(sortBy([action.meta.sort]))
            }
            const filterByPrice = sortData.filter(item => action.meta.from < item.price && item.price < action.meta.to)

            return {
                ...state,
                data: filterByPrice
            }

        case 'EDIT_PRODUCT':
            return {
                ...state,
                data: arrangement(action.payload)
            }

        case 'EDIT_DONE':
            return {
                ...state,
                data: arrangement(action.payload)
            }

        case 'DELETE_PRODUCT':
            return {
                ...state,
                data: arrangement(action.payload)
            }
        
        case 'ADD_PRODUCT':
            return {
                ...state,
                data: arrangement(action.payload)
            }

        case 'DELETE_ALL_PRODUCT_SUCCESS':
            return {
                ...state,
                data: arrangement(action.payload)
            }
        
        case 'REQUEST':
            return state

        case 'FAILURE':
            console.log("Error")
            return state

        default:
            return state;
    }
}


const initialProductState = {
    product: {
        product_colors: []
    }
}


const product = (state = initialProductState, action) => {
    switch(action.type){
        case 'GET_PRODUCT':
            return {
                ...state,
                product: arrangement(action.payload)[0],
            };
    
        default:
            return state
    }

}



export default combineReducers({ products, product })