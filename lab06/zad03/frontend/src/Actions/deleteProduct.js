import {REQUEST, DELETE_PRODUCT_SUCCESS, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';


export const deleteProduct = (id) => async dispatch => {
    dispatch(createAction({
        endpoint: `http://localhost/api/${id}`,
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            REQUEST, DELETE_PRODUCT_SUCCESS, FAILURE]
    }))
}
