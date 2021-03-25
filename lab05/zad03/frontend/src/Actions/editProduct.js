import {REQUEST, EDIT_PRODUCT, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';

export const editProduct = (id) => async dispatch => {
    dispatch(createAction({
        endpoint: `http://localhost:5000/active/${id}`,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        types: [
            REQUEST, EDIT_PRODUCT, FAILURE
        ]
    }));
}