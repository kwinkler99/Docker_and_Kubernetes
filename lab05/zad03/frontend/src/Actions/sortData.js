import {REQUEST, FAILURE, SORT_DATA} from '../types'
import { createAction } from 'redux-api-middleware';

export const sortData = (text, sort, check, to, from) => dispatch => {

    if(sort === "Sortuj od A do Z"){
        sort = "name"
    }
    else if (sort === "Sortuj od Z do A"){
        sort = "reverse"
    }
    else{
        sort = "price"
    }
    dispatch(createAction({
        endpoint: 'http://localhost:5000',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },            
        types: [REQUEST, 
            {type: SORT_DATA, meta: 
                {
                    text: text,
                    sort: sort,
                    check: check,
                    to: to,
                    from: from,
                }
            }, FAILURE],
    }))

    
}
