import {REQUEST, EDIT_DONE, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';

export const editDone = (id, product) => async dispatch => {
    dispatch(createAction({
        endpoint: `http://localhost/api/${id}`,
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...product}),
        types: [
            REQUEST, EDIT_DONE, FAILURE
        ]
    }));
}
