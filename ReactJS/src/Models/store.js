import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import  accountReducer from './accountReducer'
import  columnsTableReducer from './columnsTableReducer'
import  columnListProject from './columnsListProjectProducer'
import statusTasksReducer from './statusTasksReducer';

import  taskReducer from './tasksReducer'

const reducer = combineReducers({
    /* get reducers*/
    account: accountReducer,
    columnsTable: columnsTableReducer,
    columnsListProject: columnListProject,
    taskReducer: taskReducer,
    statusTask: statusTasksReducer, 
}
);

export default configureStore({
    reducer
});
