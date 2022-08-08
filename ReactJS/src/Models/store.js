import { combineReducers} from 'redux'
import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import  accountReducer from './accountReducer'
import  columnsTableReducer from './columnsTableReducer'
import statusTasksReducer from './statusTasksReducer';
import listReducer from './listReducer'
import projectRecducer from './projectReducer'

import  taskReducer from './tasksReducer'


const reducer = combineReducers({
    /* get reducers*/
    account: accountReducer,
    columnsTable: columnsTableReducer,
    taskReducer: taskReducer,
    statusTask: statusTasksReducer, 
    project: projectRecducer,
    list: listReducer
}
);

export default configureStore({
    reducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      })
});
