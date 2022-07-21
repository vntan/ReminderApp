import { combineReducers} from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import  reducerAccount from './accountReducer'
import  columnListTask from './columnsListTasksReducer'
import  columnListProject from './columnsListProjectProducer'


const reducer = combineReducers({
    /* get reducers*/
    account: reducerAccount,
    columnsListTask: columnListTask,
    columnsListProject: columnListProject,
}
);

export default configureStore({
    reducer
});
