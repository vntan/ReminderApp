import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'


const initState = {
    listProject : null
}

const projectSlice = createSlice({
    name: 'project',
    initialState: initState,
    reducers:{
        getAllProjectSuccess(state,action){
            state.listProject = action.payload.data
        },
        
    }
})

const {getAllProjectSuccess} = projectSlice.actions


export const getAllProject = (projectInfo) => async dispacth => {
    axios.post('/projects/showAllProject',projectInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispacth(getAllProjectSuccess({data:res.data.result}))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default projectSlice.reducer