import { combineReducers } from 'redux';
import auth from './auth';
import products from './products'

const reducers = combineReducers({  
    auth ,
    products,
    });

export default (state, action) =>
 reducers(action.type === 'LOGOUT' ? undefined : state, action);