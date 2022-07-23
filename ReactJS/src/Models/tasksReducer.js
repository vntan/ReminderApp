import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    taskInfo: null
};


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState: initialState,
    reducers: {
        getTasksSuccess(state, action){
            state.taskInfo = action.payload.data;
        }
    }
})

const {getTasksSuccess} = taskSlice.actions;

export const getTasks = (userID , cb) => async dispatch => {
    axios.post('/tasks/getTasks', {userID})
    .then((response)=>{
        const data  = response.data;
        if (data["onSuccess"]) dispatch(getTasksSuccess({data: data["result"]}));
        else console.log(data["error"]);
    })
    .catch((error)=>{
        console.log(error);
    });
}

export default taskSlice.reducer;