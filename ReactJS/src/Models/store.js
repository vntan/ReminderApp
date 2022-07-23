import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import  reducerAccount from './accountReducer'
import  columnListTask from './columnsListTasksReducer'
import  columnListProject from './columnsListProjectProducer'
import statusTasksReducer from './statusTasksReducer';

import  taskReducer from './tasksReducer'

const reducer = combineReducers({
    /* get reducers*/
    account: reducerAccount,
    columnsListTask: columnListTask,
    columnsListProject: columnListProject,
    taskReducer: taskReducer,
    statusTask: statusTasksReducer, 
}
);

export default configureStore({
    reducer
});
