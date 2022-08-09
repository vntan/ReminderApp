import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import {addListFromProject} from './listReducer'

const initState = {

}

const projectSlice = createSlice({
    name: 'project',
    initialState: initState,
    reducers:{
        getAllProjectSuccess(state,action){
            state.listProject = action.payload.data
        },
        showProjectInformationSuccess(state,action){
            state.projectInfo = action.payload.data
        },
        editProjectSuccess(state,action){
        },
        addParticipantSuccess(state,action){
        }
        
    }
})

const {getAllProjectSuccess, showProjectInformationSuccess, editProjectSuccess, addParticipantSuccess} = projectSlice.actions


export const getAllProject = (projectInfo) => async dispatch => {
    axios.post('/projects/showAllProject',projectInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispatch(getAllProjectSuccess({data:res.data.result}))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const showProjectInformation = (projectInfo) => async dispatch => {
    axios.post('/projects/showProjectInfomation',projectInfo)
    .then((res) => {
        console.log(res.data)
        if(res.data.onSuccess){
            dispatch(showProjectInformationSuccess({data:{projectInfo:res.data.result.projectInfo,participants:res.data.result.participants}}))
            dispatch(addListFromProject(res.data.result.listInformation))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const editProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/editProject',projectInfo)
    .then((res)=> {
        if(res.data.onSuccess){
            dispatch(editProjectSuccess({data:res.data.result}))
        }
        cb(res.data.onSuccess);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const addParticipant = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/addParticipantToProject',projectInfo)
    .then((res)=> {
        if(res.data.onSuccess){
        }
        cb(res.data.onSuccess);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export default projectSlice.reducer