import {REQUEST, DELETE_ALL_PRODUCT_SUCCESS, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';


export const deleteAllProducts = () => async dispatch => {
    dispatch(createAction({
        endpoint: `http://localhost:5000/all`,
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            REQUEST, DELETE_ALL_PRODUCT_SUCCESS, FAILURE]
    }))
}
