import {REQUEST, GET_PRODUCT, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';


export const getProduct = (id) => dispatch => {
    dispatch(createAction({
        endpoint: `http://localhost:5000/${id}`,
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },            
        types: [REQUEST, GET_PRODUCT, FAILURE]
    }))
}
