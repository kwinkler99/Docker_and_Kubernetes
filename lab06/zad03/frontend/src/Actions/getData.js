import {REQUEST, GET_DATA_SUCCESS, FAILURE} from '../types'
import { createAction } from 'redux-api-middleware';


export const getData = () => dispatch => {
    dispatch(createAction({
        endpoint: 'http://localhost/api/',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },            
        types: [REQUEST, GET_DATA_SUCCESS, FAILURE]
    }))
}
