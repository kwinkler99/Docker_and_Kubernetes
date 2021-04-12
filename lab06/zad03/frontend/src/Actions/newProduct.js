import {REQUEST, ADD_PRODUCT, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';

export const newProduct = (product) => async dispatch => {
    dispatch(createAction({
        endpoint: 'http://localhost/api/',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...product}),
        types: [
            REQUEST, ADD_PRODUCT, FAILURE
        ]
    }));
}
