import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import  reducerAccount from './accountReducer'


const reducer = combineReducers({
    /* get reducers*/
    account: reducerAccount
}
);

export default configureStore({
    reducer
});
